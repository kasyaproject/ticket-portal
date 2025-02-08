import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";

import { renderMail, sendMail } from "../utils/mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";
import { ROLES } from "../utils/constant";

export interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
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
      from: EMAIL_SMTP_USER,
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

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
