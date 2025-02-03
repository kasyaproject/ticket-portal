import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
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

          <form action="" className="flex flex-col gap-4 w-80">
            <Input
              label="Username/Email"
              type="text"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              label="Password"
              type={isVisiblePass ? "text" : "password"}
              variant="bordered"
              autoComplete="off"
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

            <Button
              className="text-white shadow-lg bg-gradient-to-tr from-primary-500 to-primary-400"
              radius="md"
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
