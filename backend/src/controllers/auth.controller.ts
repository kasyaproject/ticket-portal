import { Request, Response } from "express";
import * as yup from "yup";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

      // proses register user
      res.status(200).json({
        message: "Success Registration!",
        data: {
          fullname,
          username,
          email,
        },
      });
    } catch (error) {
      // jika data tidak valid, return error
      const err = error as unknown as Error;

      res.status(400).json({ message: err.message, data: null });
    }
  },
};
