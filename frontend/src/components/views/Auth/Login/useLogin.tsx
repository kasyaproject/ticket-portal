import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { ILogin } from "@/types/Auth";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your Username/Email"),
  password: yup.string().required("Please input your Password"),
});

const useLogin = () => {
  const router = useRouter();
  const callbackUrl: string = (router.query.callbackURL as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // login user melalui API dengan axios
  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Email or Password is incorrect");
    }
  };

  // Menangani response dari loginServices jika berhasil/gagal
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
