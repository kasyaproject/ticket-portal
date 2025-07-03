import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB";
import docs from "./docs/route";
import { PORT } from "./utils/env";

// Import routes
import authRouter from "./routes/auth.routes";
import mediaRouter from "./routes/media.routes";
import categoryRouter from "./routes/category.routes";
import regionRouter from "./routes/region.routes";
import eventRouter from "./routes/event.routes";
import ticketRouter from "./routes/ticket.routes";
import bannerRouter from "./routes/banner.routes";
import orderRouter from "./routes/order.routes";
import errorMiddleware from "./middlewares/error.middleware";

async function init() {
  try {
    // Koneksi ke mongoDb
    const db = await connectMongoDB();
    console.log("Database Status: ", db);

    const app = express(); // Untuk membuat aplikasi express

    app.use(cors());
    app.use(bodyParser.json()); // Untuk membaca json dari req.body
    app.use(express.urlencoded({ extended: true })); // (Opsional) Untuk form-data

    // Route API
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to API for App Ticket Portal by Andika Syamsiana",
      });
    });
    app.use("/api", [
      mediaRouter,
      authRouter,
      categoryRouter,
      regionRouter,
      eventRouter,
      ticketRouter,
      bannerRouter,
      orderRouter,
    ]); // all api routes
    docs(app); // Api Docs

    // Global error handler
    app.use(errorMiddleware.serverRoute());
    app.use(errorMiddleware.serverError());

    app.listen(PORT, async () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
