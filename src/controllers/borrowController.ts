import { Request, Response, NextFunction } from "express";
import { Borrow } from "../models/Borrow";

interface IAuthRequest extends Request {
  user?: any;
}

export const borrowBook = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookId, bookTitle, bookCover, bookDetails } = req.body;
    const userId = req.user._id;

    // Vérifier si l'utilisateur a déjà emprunté ce livre
    const existingBorrow = await Borrow.findOne({
      user: userId,
      bookId,
      isReturned: false,
    });

    if (existingBorrow) {
      res.status(400).json({ message: "Vous avez déjà emprunté ce livre" });
      return;
    }

    // Calculer la date de retour (2 semaines)
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    const borrow = await Borrow.create({
      user: userId,
      bookId,
      bookTitle,
      bookCover,
      bookDetails,
      returnDate,
    });

    res.status(201).json(borrow);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const returnBook = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { borrowId } = req.params;
    const userId = req.user._id;

    const borrow = await Borrow.findOne({
      _id: borrowId,
      user: userId,
      isReturned: false,
    });

    if (!borrow) {
      res.status(404).json({ message: "Emprunt non trouvé" });
      return;
    }

    borrow.isReturned = true;
    await borrow.save();

    res.json(borrow);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const extendBorrow = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { borrowId } = req.params;
    const { newReturnDate } = req.body;
    const userId = req.user._id;

    if (!newReturnDate) {
      res.status(400).json({ message: "newReturnDate est requis" });
      return;
    }

    const borrow = await Borrow.findOne({
      _id: borrowId,
      user: userId,
      isReturned: false,
    });

    if (!borrow) {
      res.status(404).json({ message: "Emprunt non trouvé ou déjà retourné" });
      return;
    }

    const newDate = new Date(newReturnDate);
    if (isNaN(newDate.getTime())) {
      res.status(400).json({ message: "Date de retour invalide" });
      return;
    }

    // Vérifier que la nouvelle date est après l'ancienne
    if (newDate <= new Date(borrow.returnDate)) {
      res.status(400).json({
        message:
          "La nouvelle date doit être postérieure à la date actuelle de retour",
      });
      return;
    }

    borrow.returnDate = newDate;
    await borrow.save();

    res.json(borrow);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBorrows = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user._id;
    const borrows = await Borrow.find({ user: userId }).sort({
      borrowDate: -1,
    });
    res.json(borrows);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
