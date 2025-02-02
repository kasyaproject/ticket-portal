import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import environment from "@/config/environment";

interface CostumeSession extends Session {
  accessToken?: string;
}

const headers = {
  "Content-Type": "application/json",
};

// instance API dengan axios
const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

// Intercept untuk mengecek ada tidaknya token
instance.interceptors.request.use(
  async (request) => {
    const session: CostumeSession | null = await getSession();

    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercept jika ada error di response nya
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
