import express from "express";
import {
  searchBooks,
  getBookDetails,
  getAllBooks,
} from "../controllers/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookDetails);

export default router;
