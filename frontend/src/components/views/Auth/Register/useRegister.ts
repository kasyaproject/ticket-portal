import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { addToast } from "@heroui/toast";

const registerSchema = yup.object().shape({
  fullname: yup.string().required("Please input your Fullname"),
  username: yup.string().required("Please input your Username"),
  email: yup
    .string()
    .email("Email foramt not valid!")
    .required("Please input your Email"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Please input your Password")
    .test(
      "at-least-one-uppercase-letter",
      "Password must have at least one uppercase letter",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*[A-Z])/;

        return regex.test(value);
      },
    )
    .test(
      "at-least-one-number",
      "Password must have at least one number",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*\d)/;

        return regex.test(value);
      },
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), "Password not match"], "Password not match")
    .required("Please input your Confirm Password"),
});

const useRegister = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // Register user melalui API dengan axios
  const registerServices = async (payload: IRegister) => {
    const result = await authServices.register(payload);

    return result;
  };

  // Menangani response dari registerServices jika berhasil/gagal
  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerServices,
    onError: (error) => {
      addToast({
        title: "Register Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Register Success",
        description: "Register success you can login now 😊",
        variant: "bordered",
        color: "success",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
