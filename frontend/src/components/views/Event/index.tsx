import React, { useEffect } from "react";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

const EventView = () => {
  const router = useRouter();
  const { setUrlFilter } = useChangeUrl();
  const { dataEvent, isLoadingEvent, isRefetchingEvent } = useEvent();

  useEffect(() => {
    if (router.isReady) {
      setUrlFilter();
    }
  }, [router.isReady]);

  return (
    <div className="flex flex-col justify-center w-full gap-6 px-4 lg:flex-row lg:px-0">
      {/* Filter for Event Explore */}
      <EventFilter />

      {/* List Event Explore */}
      <div className="min-h-[70vh] w-full flex-1">
        <div className="grid grid-cols-1 gap-6 px-10 mb-10 lg:px-0 lg:mb-8 lg:grid-cols-3 md:grid-cols-2">
          {!isLoadingEvent && !isRefetchingEvent
            ? dataEvent?.data?.map((event: IEvent) => (
                <CardEvent
                  event={event}
                  key={`card-event-${event._id}`}
                ></CardEvent>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <CardEvent
                  key={`card-event-loading-${index}`}
                  isLoading={true}
                ></CardEvent>
              ))}
        </div>

        {!isLoadingEvent && dataEvent?.data?.length > 0 && (
          <EventFooter totalPages={dataEvent?.pagination?.totalPage} />
        )}

        {dataEvent?.data?.length < 1 &&
          !isLoadingEvent &&
          !isRefetchingEvent && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/img/illustrations/no-data.svg"
                alt="no-data"
                width={200}
                height={200}
              />
              <h2 className="text-2xl font-bold text-center text-primary">
                No Event is Found!
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default EventView;
