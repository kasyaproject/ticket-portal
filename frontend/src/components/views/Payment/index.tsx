import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import usePayment from "./usePayment";

const PaymentView = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

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
        <h1 className="text-3xl font-bold capitalize text-primary-500">
          Transaction {status}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for your payment. Your transaction is successful."
            : "Your payment is pending. Please make payment."}
        </p>

        <div className="flex items-center gap-2">
          <Button
            className="mt-4 font-semibold w-fit"
            variant="solid"
            color="primary"
            onPress={() => router.push(`/member/transaction/${order_id}`)}
          >
            Check your transaction
          </Button>
          <Button
            className="mt-4 font-semibold w-fit"
            variant="bordered"
            color="primary"
            onPress={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
