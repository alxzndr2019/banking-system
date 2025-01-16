import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const uri =
      process.env.MONGO_URI || "mongodb://localhost:27017/clean_architecture";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
