import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const { control, handleSubmit, handleRegister, isPendingRegister, errors } =
    useRegister();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

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
          <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
          <p className="mb-4 font-semibold text-small">
            Have an account?{" "}
            <Link href="/auth/login" className="text-danger hover:underline">
              Login Here
            </Link>
          </p>

          {errors.root && (
            <p className="mb-4 text-sm text-danger">{errors?.root?.message}</p>
          )}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className={cn(
              "flex flex-col w-80",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="fullname"
                  type="text"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullname !== undefined}
                  errorMessage={errors.fullname?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Username"
                  type="text"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  type="email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Confirm Password"
                  type={isVisibleConfirm ? "text" : "password"}
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? (
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
              className="text-white shadow-lg bg-gradient-to-tr from-danger-500 to-danger-400"
              radius="md"
            >
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
