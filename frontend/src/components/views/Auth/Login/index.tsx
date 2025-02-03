import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useLogin from "./useLogin";

const Login = () => {
  const { control, handleSubmit, handleLogin, isPendingLogin, errors } =
    useLogin();
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 lg:gap-20 lg:flex-row">
      <div className="flex flex-col items-center justify-center w-full gap-10 lg:w-1/3">
        <Image
          src="/img/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />

        <Image
          src="/img/illustrations/login.svg"
          alt="logo"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>

      <Card>
        <CardBody className="p-8">
          <h2 className="text-xl font-bold text-primary-500">Login</h2>
          <p className="mb-4 font-semibold text-small">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Register Here
            </Link>
          </p>

          {errors.root && (
            <p className="mb-4 text-sm text-danger">{errors?.root?.message}</p>
          )}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4 w-80"
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Username/Email"
                  type="text"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  type={isVisiblePass ? "text" : "password"}
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
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

            <Button
              type="submit"
              className="text-white shadow-lg bg-gradient-to-tr from-primary-500 to-primary-400"
              radius="md"
            >
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
