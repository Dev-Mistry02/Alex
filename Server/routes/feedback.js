import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/*
GET /api/feedback

Return all approved reviews.
*/
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({ approved: true })
      .sort({ createdAt: -1 })
      .lean();

    const formatted = feedback.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      rating: item.rating,
      message: item.message,
      created_at: item.createdAt,
      approved: item.approved,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Failed to load feedback:", error);

    res.status(500).json({
      message: "Unable to load feedback.",
    });
  }
});


/*
POST /api/feedback

Create a new review.
*/
router.post("/", async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    const cleanName = String(name || "").trim();
    const cleanMessage = String(message || "").trim();
    const cleanRating = Number(rating);

    // Validation
    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Please enter your name.",
      });
    }

    if (cleanName.length > 80) {
      return res.status(400).json({
        message: "Name must be under 80 characters.",
      });
    }

    if (cleanRating < 1 || cleanRating > 5) {
      return res.status(400).json({
        message: "Please select a rating.",
      });
    }

    if (cleanMessage.length < 5) {
      return res.status(400).json({
        message: "Please write a little more about your experience.",
      });
    }

    if (cleanMessage.length > 500) {
      return res.status(400).json({
        message: "Feedback must be under 500 characters.",
      });
    }

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
      created_at: feedback.createdAt,
      approved: feedback.approved,
    };

    // Socket.IO is attached to Express
    const io = req.app.get("io");

    if (io) {
      io.emit("feedback:created", formatted);
    }

    res.status(201).json(formatted);
  } catch (error) {
    console.error("Feedback submission failed:", error);

    res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});


/*
DELETE /api/feedback/:id

Useful later for admin panel.
*/
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Feedback not found.",
      });
    }

    const io = req.app.get("io");

    if (io) {
      io.emit("feedback:deleted", {
        id: deleted._id.toString(),
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete feedback failed:", error);

    res.status(500).json({
      message: "Failed to delete feedback.",
    });
  }
});


export default router;