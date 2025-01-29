import express from "express";
import dotenv from "dotenv";

// Import routes
import baseRouter from "./routes/api";

const app = express(); // Untuk membuat aplikasi express
dotenv.config(); // untuk mengambil nilai dari file .env

const PORT = process.env.PORT;

app.use("/api", baseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
