import express from "express";
import Message from "../models/Message.js"; // Mets l'extension .js
const router = express.Router();

// Envoyer un message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    const message = new Message({ senderId, receiverId, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
});

// Récupérer l’historique des messages entre deux utilisateurs
router.get("/:userId/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des messages." });
  }
});

// Export en ES Module
export default router;
