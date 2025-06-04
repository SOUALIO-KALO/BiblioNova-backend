import { Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation serveur
    if (!name || !email || !subject || !message) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: "Email invalide" });
      return;
    }

    if (name.length < 2 || subject.length < 3 || message.length < 10) {
      res.status(400).json({
        message: "Les champs doivent respecter les longueurs minimales",
      });
      return;
    }

    const contact = await Contact.create({ name, email, subject, message });
    res
      .status(201)
      .json({ message: "Message enregistré avec succès", contact });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};
