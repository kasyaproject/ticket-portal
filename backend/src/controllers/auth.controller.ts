import { Request, Response } from "express";

import UserModel, {
  userDTO,
  userLoginDTO,
  userUpdatePasswordDTO,
} from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

export default {
  // CONTROLLER REGISTER USER
  async register(req: Request, res: Response) {
    // ambil data dari req.body
    const { fullname, username, email, password, confirmPassword } = req.body;

    try {
      // validasi data
      await userDTO.validate({
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
      const { identifier, password } = req.body;

      // validasi input req.body
      await userLoginDTO.validate({ identifier, password });

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

  async updateProfile(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const { fullname, profilePicture } = req.body;

      const result = await UserModel.findByIdAndUpdate(
        userId,
        {
          fullname,
          profilePicture,
        },
        { new: true }
      );

      if (!result) return response.unauthorized(res, "User not found!");

      response.success(res, result, "Profile updated successfully!");
    } catch (error) {
      response.error(res, error, "Failed to update profile");
    }
  },

  async updatePassword(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const { oldPassword, password, confirmPassword } = req.body;

      // Validasi input dari req.body
      await userUpdatePasswordDTO.validate({
        oldPassword,
        password,
        confirmPassword,
      });

      // Ambil data user berdasarkan id
      const user = await UserModel.findById(userId);

      // Jika user tidak ditemukan dan old password tidak sesuai, return error
      if (!user) return response.notFound(res, "User not found!");

      if (user.password !== encrypt(oldPassword))
        return response.notFound(res, "Old password is incorrect!");

      if (password !== confirmPassword)
        return response.error(
          res,
          null,
          "New password and confirm password do not match!"
        );

      const result = await UserModel.findByIdAndUpdate(
        userId,
        {
          password: encrypt(password),
        },
        { new: true }
      );

      response.success(res, result, "Password updated successfully!");
    } catch (error) {
      response.error(res, error, "Failed to update password user");
    }
  },
};
