import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import feedbackRoutes from "./routes/feedback.js";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);



const PORT = process.env.PORT || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";



const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

app.set("io", io);


app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ALEX Graphic Studio API is running",
  });
});


app.use("/api/feedback", feedbackRoutes);


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const startMongoChangeStream = async () => {
  try {

    if (mongoose.connection.readyState !== 1) {
      throw new Error(
        `MongoDB connection is not ready. ReadyState: ${mongoose.connection.readyState}`
      );
    }

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error(
        "MongoDB database instance is undefined."
      );
    }

    console.log(
      "Starting MongoDB feedback change stream..."
    );


    const feedbackCollection =
      db.collection("feedback");


    const changeStream =
      feedbackCollection.watch([], {
        fullDocument: "updateLookup",
      });


    changeStream.on("change", async (change) => {
      try {
        console.log(
          "MongoDB change:",
          change.operationType
        );


        if (change.operationType === "insert") {
          const doc = change.fullDocument;

          if (!doc) {
            return;
          }

          if (doc.approved === false) {
            return;
          }

          io.emit("feedback:created", {
            id: doc._id.toString(),
            name: doc.name,
            rating: doc.rating,
            message: doc.message,
            approved: doc.approved,
            created_at: doc.createdAt,
          });

          return;
        }


        if (change.operationType === "delete") {
          const deletedId =
            change.documentKey?._id?.toString();

          if (!deletedId) {
            return;
          }

          console.log(
            "Feedback deleted:",
            deletedId
          );

          io.emit("feedback:deleted", {
            id: deletedId,
          });

          return;
        }


        if (change.operationType === "update") {
          const updatedId =
            change.documentKey?._id;

          if (!updatedId) {
            return;
          }


          const updatedDocument =
            await feedbackCollection.findOne({
              _id: updatedId,
            });

          if (!updatedDocument) {
            return;
          }


          if (updatedDocument.approved === false) {
            io.emit("feedback:updated", {
              id: updatedId.toString(),
              approved: false,
            });

            return;
          }


          io.emit("feedback:updated", {
            id: updatedDocument._id.toString(),
            name: updatedDocument.name,
            rating: updatedDocument.rating,
            message: updatedDocument.message,
            approved: updatedDocument.approved,
            created_at:
              updatedDocument.createdAt,
          });

          return;
        }
      } catch (error) {
        console.error(
          "Error processing MongoDB change:",
          error
        );
      }
    });


    changeStream.on("error", (error) => {
      console.error(
        "MongoDB Change Stream Error:",
        error
      );
    });


    changeStream.on("close", () => {
      console.log(
        "MongoDB Change Stream closed."
      );
    });


    console.log(
      "MongoDB realtime change stream active."
    );

    return changeStream;
  } catch (error) {
    console.error(
      "Failed to start MongoDB Change Stream:",
      error
    );


    return null;
  }
};

const startServer = async () => {
  try {

    await connectDb();

    console.log(
      "MongoDB connected successfully"
    );

    await startMongoChangeStream();


    httpServer.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Server running at PORT:${PORT}`
        );

        console.log(
          `API: http://localhost:${PORT}`
        );

        console.log(
          `Socket.IO realtime enabled`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
};

startServer();
