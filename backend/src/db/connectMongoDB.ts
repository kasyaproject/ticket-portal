import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoUri = process.env.MONGO_URI || ""; // ambil MONGO_URI dari .env

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout lebih cepat
      socketTimeoutMS: 45000, // Maksimum waktu menunggu query
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Keluar proses jika terjadi kesalahan
  }
};

export default connectMongoDB;
