import React from "react";
import useDetailEvent from "./useDetailEvent";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";

const DetailEvent = () => {
  const {
    dataDetailEvent,
    dataTicketsByEventId,
    dataTicketInCart,

    cart,
    handleAddToCart,
    handleChangeQuantity,

    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();

  return (
    <div className="px-8 md:px-0">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <Skeleton
        isLoaded={!!dataDetailEvent?.name}
        className="w-2/5 h-4 rounded-lg "
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="flex flex-col gap-10 mt-8 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataDetailEvent?.name}
            className="w-3/4 h-8 mb-2 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-primary">
              {dataDetailEvent?.name}
            </h2>
          </Skeleton>

          <Skeleton
            isLoaded={
              !!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate
            }
            className="w-1/2 h-6 mb-2 rounded-lg"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground-400">
              <FaClock width={16} />
              <p>
                {convertTime(dataDetailEvent?.startDate)} -{" "}
                {convertTime(dataDetailEvent?.endDate)}
              </p>
            </div>
          </Skeleton>

          <Skeleton
            isLoaded={
              !!dataDetailEvent?.isOnline ||
              !!dataDetailEvent?.location?.address
            }
            className="w-4/6 h-6 mb-2 rounded-lg"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground-400">
              <FaLocationDot width={16} />
              <p>
                {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataDetailEvent?.isOnline
                  ? ""
                  : ` - ${dataDetailEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>

          <Skeleton
            className="w-full rounded-lg aspect-video"
            isLoaded={!!dataDetailEvent?.banner}
          >
            <Image
              src={dataDetailEvent?.banner && dataDetailEvent?.banner}
              alt="event-banner"
              className="object-cover w-full mb-4 rounded-lg aspect-video"
              width={1920}
              height={1080}
            />
          </Skeleton>

          <Tabs aria-label="Tab Detail Event" className="mt-4" fullWidth>
            <Tab key="Description" title="Description">
              <h2 className="text-xl font-semibold from-foreground-700">
                About Event
              </h2>
              <Skeleton
                isLoaded={!!dataDetailEvent?.description}
                className="w-full h-32 mt-2 rounded-lg"
              >
                <p className="text-foreground-500">
                  {dataDetailEvent?.description}
                </p>
              </Skeleton>
            </Tab>
            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold from-foreground-700">
                Ticket Event
              </h2>
              <Skeleton
                isLoaded={!!dataDetailEvent?.description}
                className="w-full h-32 mt-2 rounded-lg"
              >
                <div className="flex flex-col gap-8 mt-2">
                  {dataTicketsByEventId?.map((ticket: ITicket) => (
                    <DetailEventTicket
                      key={`ticket-${ticket._id}`}
                      dataTicket={ticket}
                      cart={cart}
                      handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                    />
                  ))}
                </div>
              </Skeleton>
            </Tab>
          </Tabs>
        </div>

        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
