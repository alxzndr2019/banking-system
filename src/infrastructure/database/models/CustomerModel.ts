import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerDocument extends Document {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
}
const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model<ICustomerDocument>(
  "Customer",
  CustomerSchema
);
