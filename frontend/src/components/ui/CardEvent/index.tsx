import React, { Fragment } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { convertTime } from "@/utils/date";

interface PropType {
  event?: IEvent;
  className?: string;
  isLoading?: boolean;
  key?: string;
}

const CardEvent = (props: PropType) => {
  const { event, className, isLoading, key } = props;
  // const isLoading = true;

  return (
    <Card
      shadow="sm"
      isPressable
      as={Link}
      href={`/event/${event?.slug}`}
      key={key}
      className={cn(className, "cursor-pointer hover:scale-105")}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody>
            <Image
              src={`${event?.banner}`}
              alt="cover"
              className="object-cover w-full rounded-lg aspect-video"
              width={1920}
              height={1080}
            />
          </CardBody>

          <CardFooter className="flex-col items-start pt-0 text-sm text-left">
            <h2 className="text-lg font-bold line-clamp-1 text-primary">
              {event?.name}
            </h2>

            <p className="mb-2 line-clamp-2">{event?.description}</p>
            <p className="text-foreground-500">
              {convertTime(`${event?.startDate}`)}
            </p>
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="w-full rounded-lg aspect-video bg-default-300" />
          </CardBody>

          <CardFooter className="flex flex-col items-start gap-2 pt-0">
            <Skeleton className="w-full h-3 rounded-lg lg:w-4/5 bg-default-300" />
            <Skeleton className="w-2/5 h-3 mb-2 rounded-lg bg-default-200" />
            <Skeleton className="w-3/5 h-3 rounded-lg bg-default-200" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
