import Story from "../models/storyModel.js";

export const uploadStory = async (req, res) => {
	try {
		// ✅ Check if media file exists
		if (!req.file) {
			return res.status(400).json({ error: "Media file is required" });
		}

		const { userId, mediaType } = req.body;

		// ✅ Validate userId format
		if (!userId || userId.length !== 24) {
			return res.status(400).json({ error: "Invalid user ID" });
		}

		// ✅ Create new story
		const newStory = new Story({
			user: userId,
			media: req.file.path, // Use Cloudinary URL if applicable
			mediaType,
		});

		await newStory.save();
		res.status(201).json({ message: "Story uploaded successfully", story: newStory });
	} catch (error) {
		console.error("Upload error:", error.message);
		res.status(500).json({ error: "Server error, try again later" });
	}
};
