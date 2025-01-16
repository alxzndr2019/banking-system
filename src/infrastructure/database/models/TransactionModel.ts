import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionDocument extends Document {
  _id: string;
  accountId: string;
  amount: number;
  type: "credit" | "debit";
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    accountId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ["credit", "debit"] },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model<ITransactionDocument>(
  "Transaction",
  TransactionSchema
);
