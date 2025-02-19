import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // Auto-delete after 24h
});

const Story = mongoose.model("Story", StorySchema);
export default Story; // ✅ This ensures ES Module export
