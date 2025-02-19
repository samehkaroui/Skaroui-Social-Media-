import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
}, { timestamps: true }); // timestamps ajoute automatiquement createdAt & updatedAt

// Export en ES Modules
const Message = mongoose.model("Message", messageSchema);
export default Message;
