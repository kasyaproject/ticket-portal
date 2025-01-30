import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Import routes
import authRouter from "./routes/auth.routes";
import connectMongoDB from "./db/connectMongoDB";
import docs from "./docs/route";

async function init() {
  try {
    // Koneksi ke mongoDb
    const db = await connectMongoDB();
    console.log("Database Status: ", db);

    const app = express(); // Untuk membuat aplikasi express
    app.use(cors());
    dotenv.config(); // untuk mengambil nilai dari file .env
    docs(app);

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

    app.listen(PORT, async () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
