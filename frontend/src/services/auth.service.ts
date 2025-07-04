import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  ILogin,
  IProfile,
  IRegister,
  IUpdatePassword,
} from "@/types/Auth";

const authServices = {
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  getProfile: () => instance.get(`${endpoint.AUTH}/checkMe`),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/checkMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateProfile: (payload: IProfile) =>
    instance.put(`${endpoint.AUTH}/updateProfile`, payload),
  updatePassword: (payload: IUpdatePassword) =>
    instance.put(`${endpoint.AUTH}/updatePassword`, payload),
};

export default authServices;
