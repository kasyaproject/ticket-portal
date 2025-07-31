import dotenv from "dotenv";

dotenv.config();

export const PORT: string = process.env.PORT || "";
export const SECRET_KEY: string = process.env.SECRET_KEY || ""; // Untuk encrypsi password user
export const MONGO_URI: string = process.env.MONGO_URI || ""; // URL MongoDB

// MIDTRANS ENV
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "";
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
export const MIDTRANS_TRANSACTION_URL =
  process.env.MIDTRANS_TRANSACTION_URL || "";

// NODEMAIL ENV
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_FROM: string = process.env.EMAIL_SMTP_FROM || "";
export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 587;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const CLIENT_HOST: string =
  process.env.CLIENT_HOST || "http://localhost:5001";

// CLOUDINARY
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "";
