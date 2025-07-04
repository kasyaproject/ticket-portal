import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import useSecurityTab from "./useSecurityTab";
import { Controller } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";

const SecurityTab = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);

  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);
  const toggleVisibilityConfirmPass = () =>
    setIsVisibleConfirmPass(!isVisibleConfirmPass);

  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    isPendingUpdatePassword,
    haldeUpdatePassword,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 xl:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-small text-default-400">
          Manage your account security
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(haldeUpdatePassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                label="Old Password"
                variant="bordered"
                type="password"
                placeholder="Input your Old Password"
                isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword.oldPassword?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="New Password"
                type={isVisiblePass ? "text" : "password"}
                variant="bordered"
                placeholder="Input your New Password"
                isInvalid={errorsUpdatePassword.password !== undefined}
                errorMessage={errorsUpdatePassword.password?.message}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityPass}
                  >
                    {isVisiblePass ? (
                      <IoIosEye className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <IoIosEyeOff className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                type={isVisibleConfirmPass ? "text" : "password"}
                variant="bordered"
                placeholder="Input your Confirm Password"
                isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword.confirmPassword?.message}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityConfirmPass}
                  >
                    {isVisibleConfirmPass ? (
                      <IoIosEye className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <IoIosEyeOff className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdatePassword}
          >
            {isPendingUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default SecurityTab;
