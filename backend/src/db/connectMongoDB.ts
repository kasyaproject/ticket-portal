import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  const mongoUri = process.env.MONGO_URI || ""; // ambil MONGO_URI dari .env
  if (!mongoUri)
    throw new Error("MONGO_URI is not defined in environment variables");

  try {
    await mongoose.connect(mongoUri);

    return Promise.resolve("Database Connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongoDB;
