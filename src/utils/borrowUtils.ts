import { Borrow } from "../models/Borrow";

export const autoReturnExpiredBooks = async (
  userId: string
): Promise<number> => {
  const now = new Date();
  const expiredBorrows = await Borrow.find({
    user: userId,
    isReturned: false,
    returnDate: { $lt: now },
  });

  for (const borrow of expiredBorrows) {
    borrow.isReturned = true;
    await borrow.save();
  }

  return expiredBorrows.length;
};
