import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface ErrorResnponseData {
  data: {
    name: string;
  };
}

const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResnponseData;

  if (response && res?.data?.name === "TokenExpiredError") {
    signOut();
  }
};

export { onErrorHandler };
