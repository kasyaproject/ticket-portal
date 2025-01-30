import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Import routes
import authRouter from "./routes/auth.routes";
import connectMongoDB from "./db/connectMongoDB";

const app = express(); // Untuk membuat aplikasi express

dotenv.config(); // untuk mengambil nilai dari file .env
app.use(bodyParser.json()); // Untuk membaca json dari req.body
app.use(express.urlencoded({ extended: true })); // (Opsional) Untuk form-data
const PORT = process.env.PORT; // Ambil PORT dari .env

// Route API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API for App Ticket Portal by Andika Syamsiana",
  });
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB(); // Koneksi ke MongoDB
});
