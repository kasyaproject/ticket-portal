import dotenv from "dotenv";

dotenv.config();

export const PORT: string = process.env.PORT || "";
export const SECRET_KEY: string = process.env.SECRET_KEY || ""; // Untuk encrypsi password user
export const MONGO_URI: string = process.env.MONGO_URI || ""; // URL MongoDB

// NODEMAIL ENV
export const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERVICE_NAME: string =
  process.env.EMAIL_SMTP_SERVICE_NAME || "";
export const CLIENT_HOST: string =
  process.env.CLIENT_HOST || "http://localhost:5001";
