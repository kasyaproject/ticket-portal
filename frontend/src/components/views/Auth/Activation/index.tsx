import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@heroui/react";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const route = useRouter();
  const { status } = props;

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
          src={
            status === "success"
              ? "/img/illustrations/success.svg"
              : "/img/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary-500">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for register account in Ticket Portal"
            : "Confirmation code is invalid"}
        </p>

        <Button
          className="mt-4 font-semibold w-fit"
          variant="bordered"
          color="primary"
          onClick={() => route.push("/auth/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Activation;
