import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please insert your old password"),
  password: yup.string().required("Please insert your new password"),
  confirmPassword: yup
    .string()
    .required("Please insert your confirmation password"),
});

const useSecurityTab = () => {
  // Resolver untuk Update Info Event Location
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);

    return data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (error) => {
        addToast({
          title: "Update Password Failed",
          description: error.message + " 😢",
          variant: "bordered",
          color: "danger",
        });
      },
      onSuccess: () => {
        resetUpdatePassword();
        setValueUpdatePassword("oldPassword", "");
        setValueUpdatePassword("password", "");
        setValueUpdatePassword("confirmPassword", "");

        addToast({
          title: "Update Password Success",
          description: "Success Update Password info 😊",
          variant: "bordered",
          color: "success",
        });
      },
    });

  const haldeUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    isPendingUpdatePassword,
    haldeUpdatePassword,
  };
};
export default useSecurityTab;
