import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  identifier: string;
  password: string;
}

// Untuk Registrasi
interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Untuk Activation User
interface IActivation {
  code: string;
}

// Menambahkan data ke User di interface
interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

// Menambahkan data ke Session di interface
interface SessionExtended extends Session {
  accessToken?: string;
}

// Menambahkan data ke jwt di interface
interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  ILogin,
  IRegister,
  IActivation,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
