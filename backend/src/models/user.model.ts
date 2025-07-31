import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import * as Yup from "yup";

import { renderMail, sendMail } from "../utils/mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_FROM } from "../utils/env";
import { ROLES } from "../utils/constant";

const validatePassword = Yup.string()
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
  );
const validateConfirmPassword = Yup.string()
  .required()
  .oneOf([Yup.ref("password")], "Passwords not match");

export const USER_MODEL_NAME = "user";

export const userLoginDTO = Yup.object({
  identifier: Yup.string(),
  password: validatePassword,
});

export const userUpdatePasswordDTO = Yup.object({
  oldPassword: Yup.string().required(),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

export const userDTO = Yup.object({
  fullname: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  role: Yup.string().required(),
});

export type TypeUser = Yup.InferType<typeof userDTO>;

export interface User extends Omit<TypeUser, "ConfirmPassword"> {
  isActive: boolean;
  activationCode: string;
  role: string;
  profilePicture: string;
  createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
  {
    fullname: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: [ROLES.ADMIN, ROLES.MEMBER], // diambil dari CONSTANT utils
      default: ROLES.MEMBER,
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

// Middleware untuk encrypt password sebelum di save di DB
UserSchema.pre("save", function (next) {
  const user = this;

  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);

  next();
});

// Middleware untuk generate activation code dan mengirim email
UserSchema.post("save", async function (doc, next) {
  try {
    const user = doc;
    console.log("send email to : ", user.email);

    const contentMail = await renderMail("registration-success.ejs", {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${CLIENT_HOST}/api/auth/activation?code=${user.activationCode}`,
    });

    await sendMail({
      from: EMAIL_SMTP_FROM,
      to: user.email,
      subject: "Registrasi Berhasil - Aktivasi akun anda !",
      content: contentMail,
    });
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

// Middleware untuk tidak menampilkan password di json response
UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = mongoose.model(USER_MODEL_NAME, UserSchema);

export default UserModel;
