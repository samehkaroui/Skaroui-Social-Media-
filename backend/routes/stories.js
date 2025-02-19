import express from "express";
import Story from "../models/Story.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();

// Multer setup for Cloudinary
const storage = multer.diskStorage({});
const upload = multer({ storage });

// 📌 Upload Story
router.post("/", upload.single("story"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });

    const newStory = new Story({
      userId: req.body.userId,
      mediaUrl: result.secure_url,
      mediaType: req.file.mimetype.startsWith("image") ? "image" : "video",
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// 📌 Get Stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().populate("userId", "name");
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// 📌 Reply to a Story
router.post("/:id/reply", async (req, res) => {
  res.json({ message: `Reply to story ${req.params.id}: ${req.body.message}` });
});

export default router;
