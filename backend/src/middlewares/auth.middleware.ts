import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../utils/interface";

export default (req: Request, res: Response, next: NextFunction) => {
  const authorized = req.headers?.authorization;

  // Periksa apakah permintaan memiliki header authorization
  if (!authorized)
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });

  // Periksa apakah authorized valid
  const [prefix, token] = authorized.split(" ");

  if (!(prefix === "Bearer" && token))
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });

  // Periksa apakah user ada
  const user = getUserData(token);
  if (!user)
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });

  // jika validasi lolo Simpan user ke dalam request
  (req as IReqUser).user = user;

  next();
};
