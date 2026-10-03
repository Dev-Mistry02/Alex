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

/* =========================================================
   CORS
========================================================= */

const configuredClientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .map((url) => url.replace(/\/+$/, ""))
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  // Requests such as Postman/curl/server-to-server
  if (!origin) {
    return true;
  }

  // If CLIENT_URL is not configured, allow temporarily.
  if (configuredClientUrls.length === 0) {
    return true;
  }

  // Local development
  if (
    /^https?:\/\/localhost:\d+$/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1:\d+$/.test(origin)
  ) {
    return true;
  }

  // Render / production frontend
  return configuredClientUrls.includes(origin);
};

/*
  Express CORS
*/
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        console.warn("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],

    credentials: true,

    optionsSuccessStatus: 204,
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "1mb",
  })
);

/* =========================================================
   SOCKET.IO
========================================================= */

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        console.warn("Socket.IO CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    credentials: true,
  },

  transports: ["polling", "websocket"],
});

app.set("io", io);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ALEX Graphic Studio API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "unavailable",
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   FEEDBACK ROUTES
========================================================= */

app.use("/api/feedback", feedbackRoutes);

/* =========================================================
   SOCKET CONNECTION
========================================================= */

io.on("connection", (socket) => {
  console.log("Socket client connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log(
      "Socket client disconnected:",
      socket.id,
      reason
    );
  });
});

/* =========================================================
   MONGODB CHANGE STREAM
========================================================= */

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

        /* =================================================
           INSERT
        ================================================= */

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
            created_at:
              doc.createdAt || new Date(),
          });

          return;
        }

        /* =================================================
           DELETE
        ================================================= */

        if (change.operationType === "delete") {
          const deletedId =
            change.documentKey?._id?.toString();

          if (!deletedId) {
            return;
          }

          io.emit("feedback:deleted", {
            id: deletedId,
          });

          return;
        }

        /* =================================================
           UPDATE
        ================================================= */

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

          if (
            updatedDocument.approved === false
          ) {
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
              updatedDocument.createdAt ||
              new Date(),
          });
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

/* =========================================================
   MONGODB CONNECTION
========================================================= */

let mongoRetryTimer = null;
let mongoChangeStreamStarted = false;

const connectMongoAndRealtime = async () => {
  try {
    await connectDb();

    console.log(
      "MongoDB connected successfully"
    );

    if (!mongoChangeStreamStarted) {
      const changeStream =
        await startMongoChangeStream();

      mongoChangeStreamStarted =
        Boolean(changeStream);
    }
  } catch (error) {
    console.error(
      "MongoDB startup failed:",
      error.message
    );

    clearTimeout(mongoRetryTimer);

    mongoRetryTimer = setTimeout(() => {
      connectMongoAndRealtime();
    }, 5000);
  }
};

/* =========================================================
   START SERVER
========================================================= */

httpServer.on("error", (error) => {
  console.error(
    "HTTP server error:",
    error
  );
});

httpServer.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `ALEX API running on port ${PORT}`
    );

    console.log(
      `Health: /api/health`
    );

    console.log(
      `Feedback: /api/feedback`
    );

    console.log(
      "Socket.IO realtime enabled"
    );

    console.log(
      "Allowed frontend origins:",
      configuredClientUrls.length
        ? configuredClientUrls
        : "ALL (CLIENT_URL not configured)"
    );

    connectMongoAndRealtime();
  }
);