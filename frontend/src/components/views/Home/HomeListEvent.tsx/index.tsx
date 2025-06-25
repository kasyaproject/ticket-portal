import React from "react";
import Link from "next/link";
import { IEvent } from "@/types/Event";
import CardEvent from "@/components/ui/CardEvent";

interface PropTypes {
  title: String;
  events: IEvent[];
  isLoading: boolean;
}

const HomeListEvent = (props: PropTypes) => {
  const { title, events, isLoading } = props;

  return (
    <section className="mb-6 lg:mb-12">
      <div className="flex items-center justify-between px-6 mb-2 lg:px-0">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>

        <Link
          href="/event"
          className="font-semibold text-foreground-500 hover:underline "
        >
          See more
        </Link>
      </div>

      <div className="grid auto-cols-[13rem] grid-flow-col pb-8 px-4 gap-6 overflow-x-auto py-2 lg:grid-cols-4 lg:px-4">
        {!isLoading
          ? events?.map((event) => (
              <CardEvent
                event={event}
                key={`card-event-${event._id}`}
              ></CardEvent>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-loading-${index}`}
                isLoading={isLoading}
              ></CardEvent>
            ))}
      </div>
    </section>
  );
};

export default HomeListEvent;
