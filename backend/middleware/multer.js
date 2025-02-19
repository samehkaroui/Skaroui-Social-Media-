import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // ✅ Ensure this folder exists
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

// File filter
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
		cb(null, true);
	} else {
		cb(new Error("Invalid file type"), false);
	}
};

// ✅ Middleware to handle file uploads
export const upload = multer({ storage, fileFilter });
