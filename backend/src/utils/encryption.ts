import crypto from "crypto";

export const encrypt = (password: string): string => {
  const secretKey = process.env.SECRET_KEY || ""; // ambil SECRET_KEY dari .env

  const encrypted = crypto
    .pbkdf2Sync(password, secretKey, 100000, 64, "sha512")
    .toString("hex");

  return encrypted;
};
