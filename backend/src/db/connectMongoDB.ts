import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoUri = process.env.MONGO_URI || ""; // ambil MONGO_URI dari .env

  try {
    await mongoose.connect(mongoUri);

    return Promise.resolve("Database Connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongoDB;
