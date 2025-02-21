import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const route = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/img/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />

        <Image
          src="/img/illustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary-500">
          Create Account Success
        </h1>
        <p className="text-xl font-bold text-default-500">
          check your email to activate your account
        </p>

        <Button
          className="mt-4 font-semibold w-fit"
          variant="bordered"
          color="primary"
          onPress={() => route.push("/auth/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
