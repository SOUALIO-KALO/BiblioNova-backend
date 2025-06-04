import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
dotenv.config();

// Configuration de dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Connexion à MongoDB
connectDB();

// Gestion des erreurs
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "❌ Une erreur est survenue" });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
