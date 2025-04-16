import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);

    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingUpdateEvent,
    isSuccess: isSuccessUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      addToast({
        title: "Update Category Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchEvent();
      addToast({
        title: "Update Category Success",
        description: "Success Upate category info 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  // hit ke API untuk update banner
  const handleUpoadteBanner = (data: IEventForm) => {
    mutateUpdateEvent(data);
  };

  // hit ke API untuk update event info
  const handleUpdateEventInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      isFetured: data.isFetured === "true" ? true : false,
      isPublish: data.isPublish === "true" ? true : false,
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
    };

    mutateUpdateEvent(payload);
  };

  // hit ke API untuk update event location
  const handleEventLocation = (data: IEventForm) => {
    const payload = {
      isOnline: data.isOnline === "true" ? true : false,
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };

    mutateUpdateEvent(payload);
  };

  // hit ke API untuk data category
  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);

    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventById(`${query.id}`),
    enabled: isReady,
  });

  // hit ke API untuk data region
  const { data: dataDefaultRegency, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,

    handleUpoadteBanner,
    handleUpdateEventInfo,
    handleEventLocation,
    isPendingUpdateEvent,
    isSuccessUpdateEvent,

    dataDefaultRegency,
    isPendingDefaultRegion,
  };
};
export default useDetailEvent;
