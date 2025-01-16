import mongoose, { Schema, Document } from "mongoose";

export interface IAccountDocument extends Document {
  _id: string;
  customerId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
  {
    customerId: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AccountModel = mongoose.model<IAccountDocument>(
  "Account",
  AccountSchema
);
