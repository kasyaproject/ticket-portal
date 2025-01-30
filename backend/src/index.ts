import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Import routes
import authRouter from "./routes/auth.routes";
import connectMongoDB from "./db/connectMongoDB";

const app = express(); // Untuk membuat aplikasi express
dotenv.config(); // untuk mengambil nilai dari file .env
app.use(bodyParser.json()); // Untuk membaca json dari req.body

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
});
