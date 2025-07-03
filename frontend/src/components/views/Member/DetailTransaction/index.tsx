import React from "react";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environment";
import useDetailTransaction from "./useDetailTransaction";
import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react";
import { convertToIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";

const DetailTransaction = () => {
  const { dataTransaction, dataEvent, dataTicket } = useDetailTransaction();

  return (
    <Card className="px-5 py-4">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <CardBody className="gap-8">
        {/* Detail Transaction */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Detail Transaction :</h4>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex gap-2">
              <p className="text-sm text-nowrap">Order Id : </p>
              <Skeleton
                isLoaded={!!dataTransaction?.orderId}
                className="w-1/2 h-4 rounded-md "
              >
                <p className="text-sm font-semibold">
                  {dataTransaction?.orderId}
                </p>
              </Skeleton>
            </div>

            <div className="flex gap-2">
              <p className="text-sm ">Ticket : </p>
              <Skeleton
                isLoaded={!!dataTicket?.name}
                className="h-4 rounded-md"
              >
                <p className="text-sm font-semibold">
                  {`${dataTicket?.name}`}{" "}
                  <span className="text-xs">{`( ${convertToIDR(dataTicket?.price)} x ${dataTransaction?.quantity} )`}</span>
                </p>
              </Skeleton>
            </div>

            <div className="flex gap-2">
              <p className="text-sm ">Total : </p>
              <Skeleton
                isLoaded={!!dataTransaction?.total}
                className="h-4 rounded-md"
              >
                <p className="text-sm font-semibold">
                  {`${convertToIDR(dataTransaction?.total)}`}
                </p>
              </Skeleton>
            </div>

            <div className="flex gap-2">
              <p className="text-sm ">Status : </p>
              <Skeleton
                isLoaded={!!dataTransaction?.status}
                className="w-1/2 h-4 rounded-md"
              >
                <Chip
                  className="text-sm font-bold text-white capitalize"
                  color={
                    dataTransaction?.status === "complete"
                      ? "success"
                      : "warning"
                  }
                  size="sm"
                >
                  {dataTransaction?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>

        <hr />

        {/* Ticket Transaction */}
        {dataTransaction?.status == "complete" && (
          <div className="flex flex-col gap-2">
            <h4 className="font-bold">Ticket :</h4>

            <div className="flex flex-col gap-4 mt-2">
              {dataTransaction?.vouchers?.map(
                (voucher: { voucherId: string }) => (
                  <Card
                    key={`voucher-${voucher.voucherId}`}
                    className="p-4 pt-6 lg:p-2"
                    shadow="sm"
                  >
                    <CardBody className="lg:gap-20 lg:flex-row lg:items-start">
                      {/* Generate QR Code */}
                      <div className="w-2/3 mx-auto mb-10 lg:m-0 lg:w-1/5">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-full !w-full"
                        />
                      </div>

                      <div className=" lg:mt-4">
                        <h2 className="mb-4 text-2xl font-bold text-primary">
                          {dataEvent?.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <p className="text-foreground-500">Date : </p>
                          <p className="text-primary">{`${convertTime(dataEvent?.startDate)} - ${convertTime(dataEvent?.endDate)}`}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <p className="text-foreground-500">Location : </p>
                          <p className="text-primary">
                            {dataEvent?.isOnline ? "Online" : "Offline"}
                          </p>
                        </div>

                        {dataEvent?.isOnline && (
                          <Button
                            as={Link}
                            href={`${dataEvent?.location?.address}`}
                            className="w-full mt-4 text-sm font-semibold"
                            color="primary"
                          >
                            Join Now
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}

        {dataTransaction?.status === "pending" && (
          <Button
            className="w-full"
            color="primary"
            onPress={() => window.snap.pay(dataTransaction?.payment?.token)}
          >
            Pay now
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailTransaction;
