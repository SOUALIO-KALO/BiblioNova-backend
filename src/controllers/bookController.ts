import { Request, Response } from "express";
import axios from "axios";

const formatBook = (item: any) => ({
  bookId: item.id,
  title: item.volumeInfo.title,
  authors: item.volumeInfo.authors?.join(", ") || "Auteur inconnu",
  description: item.volumeInfo.description || "",
  imageUrl: item.volumeInfo.imageLinks?.thumbnail || "",
  pageCount: item.volumeInfo.pageCount || 0,
  language: item.volumeInfo.language || "",
  category: item.volumeInfo.categories?.join(", ") || "Inconnu",
  previewLink: item.volumeInfo.previewLink || "",
});

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map(formatBook);
    res.json(books);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des livres:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des livres" });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map(formatBook);
    res.json(books);
  } catch (error: any) {
    console.error("Erreur lors de la recherche des livres:", error);
    res.status(500).json({ message: "Erreur lors de la recherche des livres" });
  }
};

export const getBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const book = formatBook(response.data);
    res.json(book);
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des détails du livre:",
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des détails du livre" });
  }
};
