import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
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

    // Enregistrer le message dans MongoDB
    const contact = await Contact.create({ name, email, subject, message });

    // Configurer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email de confirmation pour l'utilisateur
    const userMailOptions = {
      from: `"Bibliothèque Biblio-nova" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de réception de votre message",
      text: `Bonjour ${name},\n\nMerci pour votre message concernant : "${subject}".\nNous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.\n\nDétails de votre message :\n${message}\n\nCordialement,\nL'équipe Biblio-nova`,
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci pour votre message concernant : <strong>${subject}</strong>.</p>
        <p>Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.</p>
        <p><strong>Votre message :</strong><br>${message}</p>
        <p>Cordialement,<br>L'équipe Biblio-nova</p>
      `,
    };

    // Email de notification pour l'administrateur
    const adminMailOptions = {
      from: `"Formulaire de Contact Biblio-nova" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Votre email
      subject: `Nouveau message de contact : ${subject}`,
      text: `Nouveau message reçu de :\n\nNom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\nMessage :\n${message}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De :</strong> ${name} (${email})</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message}
        </div>
        <p>Pour répondre à ce message, utilisez l'adresse email : ${email}</p>
      `,
    };

    // Envoyer les deux emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    res.status(201).json({
      message: "Message enregistré et emails envoyés avec succès",
      contact,
    });
  } catch (error: any) {
    console.error(
      "Erreur lors de l'envoi des emails ou de l'enregistrement:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors du traitement de votre message",
    });
  }
};
