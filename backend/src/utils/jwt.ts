import { Types } from "mongoose";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullname"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const secretKey = process.env.SECRET_KEY || ""; // ambil SECRET_KEY dari .env

  // generate token
  const token = jwt.sign(user, secretKey, {
    expiresIn: "1h",
  });

  return token;
};

export const getUserData = (token: string) => {
  const secretKey = process.env.SECRET_KEY || ""; // ambil SECRET_KEY dari .env

  const user = jwt.verify(token, secretKey) as IUserToken;

  return user;
};
