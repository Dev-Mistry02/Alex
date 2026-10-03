import express from "express";
import mongoose from "mongoose";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/* =========================================================
   DATABASE CHECK
========================================================= */

router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.set("Retry-After", "5");

    return res.status(503).json({
      message:
        "Feedback service is starting. Please try again in a few seconds.",
    });
  }

  next();
});

/* =========================================================
   GET ALL APPROVED FEEDBACK
========================================================= */

router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      approved: { $ne: false },
    })
      .sort({ createdAt: -1 })
      .lean();

    const formatted = feedback.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      rating: Number(item.rating),
      message: item.message,
      created_at:
        item.createdAt ||
        item.created_at ||
        null,
      approved: item.approved !== false,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error(
      "Failed to load feedback:",
      error
    );

    return res.status(500).json({
      message: "Unable to load feedback.",
    });
  }
});

/* =========================================================
   CREATE FEEDBACK
========================================================= */

router.post("/", async (req, res) => {
  try {
    const {
      name,
      rating,
      message,
    } = req.body || {};

    const cleanName = String(
      name || ""
    ).trim();

    const cleanMessage = String(
      message || ""
    ).trim();

    const cleanRating = Number(rating);

    /* -------------------------
       NAME VALIDATION
    ------------------------- */

    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Please enter your name.",
      });
    }

    if (cleanName.length > 80) {
      return res.status(400).json({
        message:
          "Name must be under 80 characters.",
      });
    }

    /* -------------------------
       RATING VALIDATION
    ------------------------- */

    if (
      !Number.isInteger(cleanRating) ||
      cleanRating < 1 ||
      cleanRating > 5
    ) {
      return res.status(400).json({
        message: "Please select a rating.",
      });
    }

    /* -------------------------
       MESSAGE VALIDATION
    ------------------------- */

    if (cleanMessage.length < 5) {
      return res.status(400).json({
        message:
          "Please write a little more about your experience.",
      });
    }

    if (cleanMessage.length > 150) {
      return res.status(400).json({
        message:
          "Feedback must be under 150 characters.",
      });
    }

    /* -------------------------
       CREATE DATABASE RECORD
    ------------------------- */

    const feedback = await Feedback.create({
      name: cleanName,
      rating: cleanRating,
      message: cleanMessage,
      approved: true,
    });

    const formatted = {
      id: feedback._id.toString(),
      name: feedback.name,
      rating: feedback.rating,
      message: feedback.message,
      created_at:
        feedback.createdAt ||
        new Date(),
      approved:
        feedback.approved !== false,
    };

    /*
      IMPORTANT:

      Do NOT emit Socket.IO here.

      MongoDB Change Stream in server.js
      handles feedback:created.
    */

    return res
      .status(201)
      .json(formatted);
  } catch (error) {
    console.error(
      "Feedback submission failed:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong. Please try again.",
    });
  }
});

/* =========================================================
   DELETE FEEDBACK
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid feedback ID.",
      });
    }

    const deleted =
      await Feedback.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        message:
          "Feedback not found.",
      });
    }

    /*
      MongoDB Change Stream in server.js
      will broadcast feedback:deleted.
    */

    return res.status(200).json({
      success: true,
      id: deleted._id.toString(),
    });
  } catch (error) {
    console.error(
      "Delete feedback failed:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to delete feedback.",
    });
  }
});

export default router;