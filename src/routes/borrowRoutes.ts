import express from "express";
import {
  borrowBook,
  returnBook,
  getUserBorrows,
  extendBorrow,
} from "../controllers/borrowController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.use(protect);

router.post("/", borrowBook);
router.patch("/return/:borrowId", returnBook);
router.patch("/extend/:borrowId", extendBorrow);
router.get("/my-borrows", getUserBorrows);

export default router;
