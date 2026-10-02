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

const PORT = Number.parseInt(process.env.PORT || "5000", 10);

const configuredClientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) =>
  !origin ||
  configuredClientUrls.length === 0 ||
  /^https?:\/\/localhost:\d+$/.test(origin) ||
  /^https?:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
  configuredClientUrls.includes(origin);

const io = new Server(httpServer, {
  cors: {
    origin: isAllowedOrigin,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

app.set("io", io);



app.use(
  cors({
    origin: isAllowedOrigin,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());



app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ALEX Graphic Studio API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "unavailable",
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
    /*
    ----------------------------------------
    Check Mongoose connection
    ----------------------------------------
    */

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

    /*
    ----------------------------------------
    Feedback collection
    ----------------------------------------
    */

    const feedbackCollection =
      db.collection("feedback");

    /*
    ----------------------------------------
    Start Change Stream
    ----------------------------------------
    */

    const changeStream =
      feedbackCollection.watch([], {
        fullDocument: "updateLookup",
      });

    /*
    ========================================
    CHANGE EVENT
    ========================================
    */

    changeStream.on("change", async (change) => {
      try {
        console.log(
          "MongoDB change:",
          change.operationType
        );

        /*
        ====================================
        INSERT
        ====================================
        */

        if (change.operationType === "insert") {
          const doc = change.fullDocument;

          if (!doc) {
            return;
          }

          // Only emit approved feedback
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

        /*
        ====================================
        DELETE
        ====================================
        */

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

        /*
        ====================================
        UPDATE
        ====================================
        */

        if (change.operationType === "update") {
          const updatedId =
            change.documentKey?._id;

          if (!updatedId) {
            return;
          }

          /*
          ------------------------------------
          Get updated document
          ------------------------------------
          */

          const updatedDocument =
            await feedbackCollection.findOne({
              _id: updatedId,
            });

          if (!updatedDocument) {
            return;
          }

          /*
          ------------------------------------
          If feedback is not approved
          ------------------------------------
          */

          if (updatedDocument.approved === false) {
            io.emit("feedback:updated", {
              id: updatedId.toString(),
              approved: false,
            });

            return;
          }

          /*
          ------------------------------------
          Approved feedback
          ------------------------------------
          */

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

    /*
    ========================================
    CHANGE STREAM ERROR
    ========================================
    */

    changeStream.on("error", (error) => {
      console.error(
        "MongoDB Change Stream Error:",
        error
      );
    });

    /*
    ========================================
    CHANGE STREAM CLOSE
    ========================================
    */

    changeStream.on("close", () => {
      console.log(
        "MongoDB Change Stream closed."
      );
    });

    /*
    ========================================
    SUCCESS
    ========================================
    */

    console.log(
      "MongoDB realtime change stream active."
    );

    return changeStream;
  } catch (error) {
    console.error(
      "Failed to start MongoDB Change Stream:",
      error
    );

    /*
    ----------------------------------------
    Don't crash the entire server
    ----------------------------------------
    */

    return null;
  }
};

/*
========================================
START SERVER
========================================
*/

const startServer = async () => {
  httpServer.once("error", (error) => {
    console.error(
      `Unable to start the server on port ${PORT}:`,
      error
    );
    process.exit(1);
  });

  httpServer.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running at PORT:${PORT}`);
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Socket.IO realtime enabled`);

    try {
      await connectDb();
      console.log("MongoDB connected successfully");
      await startMongoChangeStream();
    } catch (error) {
      console.error(
        "MongoDB startup failed. API remains available:",
        error
      );
    }
  });
};

/*
========================================
RUN
========================================
*/

startServer();