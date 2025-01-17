import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionDocument extends Document {
  _id: string;
  accountId: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "disputed" | "completed";
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    accountId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ["credit", "debit"] },
    status: {
      type: String,
      required: true,
      enum: ["pending", "disputed", "completed"],
    },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model<ITransactionDocument>(
  "Transaction",
  TransactionSchema
);
