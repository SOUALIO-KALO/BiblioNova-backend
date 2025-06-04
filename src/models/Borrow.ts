import mongoose, { Document, Schema } from "mongoose";

export interface IBorrow extends Document {
  user: mongoose.Types.ObjectId;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  bookDetails: string;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
}

const borrowSchema = new Schema<IBorrow>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    bookCover: {
      type: String,
      required: true,
    },
    bookDetails: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
