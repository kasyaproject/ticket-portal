import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoUri = process.env.MONGO_URI; // ambil MONGO_URI dari .env

  if (!mongoUri) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Keluar proses jika MONGO_URI tidak ada
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Keluar proses jika terjadi kesalahan
  }
};

export default connectMongoDB;
