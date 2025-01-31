import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env";

const connectMongoDB = async () => {
  const mongoUri = MONGO_URI; // ambil MONGO_URI dari .env
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
