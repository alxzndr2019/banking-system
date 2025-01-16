import mongoose from "mongoose";
export class Customer {
  constructor(
    public id: mongoose.Types.ObjectId,
    public name: string,
    public email: string,
    public createdAt: Date
  ) {}
}
