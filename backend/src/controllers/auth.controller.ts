import { Request, Response } from "express";
import * as yup from "yup";

import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string; // untuk email atau username
  password: string;
};

// schema validasi data
const registerValidateSchema = yup.object({
  fullname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(7, "Password must be at least 7 characters")
    .test(
      "at-least-one-uppercase-letter",
      "Password must have at least one uppercase letter",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*[A-Z])/;

        return regex.test(value);
      }
    )
    .test(
      "at-least-one-number",
      "Password must have at least one number",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*\d)/;

        return regex.test(value);
      }
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords not match"),
});

export default {
  // CONTROLLER REGISTER USER
  async register(req: Request, res: Response) {
    // ambil data dari req.body
    const { fullname, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      // validasi data
      await registerValidateSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullname,
        username,
        email,
        password,
      });

      // proses register user
      response.success(res, result, "Success Registration!");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "Failed Registration");
    }
  },

  // CONTROLLER GET ACTIVATION CODE USER
  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };

      const user = await UserModel.findOneAndUpdate(
        { activationCode: code },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );

      if (!user) return response.unauthorized(res, "User not found");

      response.success(res, user, "User successfully activated");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "Failed Activated");
    }
  },

  // CONTROLLER LOGIN USER
  async login(req: Request, res: Response) {
    try {
      // ambil data dari req.body
      const { identifier, password } = req.body as unknown as TLogin;

      // ambil data User berdasarkan identifier dan isActive status nya
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isActive: true,
      });

      if (!userByIdentifier)
        return response.unauthorized(res, "User not found");

      // validasi input password dengan password user
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword)
        return response.unauthorized(res, "Wrong Password!");

      // Jika lolos validasi maka Generta Token jwt
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, token, "Login Success");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "Login Failed");
    }
  },

  // CONTROLLER GET USER
  async checkMe(req: IReqUser, res: Response) {
    try {
      // Ambil data user berdasarkan token
      const user = req.user;

      // Cari data user berdasarkan id di mongoDb user
      const result = await UserModel.findById(user?.id);

      if (!result) return response.unauthorized(res, "User not found!");

      // Jika data user ditemukan, return data user
      response.success(res, result, "Success get user profile!");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "User not found!");
    }
  },
};
