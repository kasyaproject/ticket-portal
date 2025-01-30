import { Request, Response } from "express";
import * as yup from "yup";

import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

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
  password: yup.string().required().min(8),
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
        // password: await bcrypt.hash(password, 10),
      });

      // proses register user
      res.status(200).json({
        message: "Success Registration!",
        data: result,
      });
    } catch (error) {
      // jika data tidak valid, return error
      const err = error as unknown as Error;

      res.status(400).json({ message: err.message, data: null });
    }
  },

  // CONTROLLER LOGIN USER
  async login(req: Request, res: Response) {
    try {
      // ambil data dari req.body
      const { identifier, password } = req.body as unknown as TLogin;

      // ambil data User berdasarkan identifier
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!userByIdentifier)
        return res.status(403).json({ message: "User not found!", data: null });

      // validasi input password dengan password user
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword)
        return res.status(403).json({ message: "Wrong Password!", data: null });

      // Jika lolos validasi maka Generta Token jwt
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      res.status(200).json({ message: "Login Success", data: token });
    } catch (error) {
      // jika data tidak valid, return error
      const err = error as unknown as Error;

      res.status(400).json({ message: err.message, data: null });
    }
  },

  async checkMe(req: IReqUser, res: Response) {
    try {
      // Ambil data user berdasarkan token
      const user = req.user;

      // Cari data user berdasarkan id di mongoDb user
      const result = await UserModel.findById(user?.id);

      if (!result)
        return res.status(404).json({ message: "User not found!", data: null });

      // Jika data user ditemukan, return data user
      res
        .status(200)
        .json({ message: "Success get user profile!", data: result });
    } catch (error) {
      // jika data tidak valid, return error
      const err = error as unknown as Error;

      res.status(400).json({ message: err.message, data: null });
    }
  },
};
