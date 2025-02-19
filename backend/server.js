import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import storyRoutes from "./routes/stories.js";

import messageRoutes from "./routes/messages.js"; 
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

// Charger les variables d'environnement
dotenv.config();
 
// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Création du serveur Express et Socket.io
const app = express();
const port = process.env.PORT || 5000;

// Configuration de __dirname pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Création du serveur HTTP et WebSocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" })); // Pour analyser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour les formulaires (urlencoded)
app.use(cookieParser());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stories", storyRoutes);

// WebSocket (Chat en temps réel)
io.on("connection", (socket) => {
  console.log("Utilisateur connecté:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté:", socket.id);
  });
});

// Servir le frontend en production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.use((req, res) => {
  res.send('API is Running ...');
});
// Lancer le serveur
server.listen(port, () => {
  console.log(`🚀 Serveur en ligne sur le port ${port}`);
  connectMongoDB();
});
 
