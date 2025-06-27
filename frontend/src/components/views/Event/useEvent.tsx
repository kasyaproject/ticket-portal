import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/event.service";
import useChangeUrl from "@/hooks/useChangeUrl";

const useEvent = () => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  // ambil data categori dari API dengan parameter params yang sudah ada/baru
  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isOnline=${currentIsOnline}&isFetured=${currentIsFeatured}`;

    const res = await eventServices.getEvents(params);
    const { data } = res;

    return data;
  };

  // digunakan untuk refetch data seperti search/page/limit
  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsOnline,
      currentIsFeatured,
    ],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  };
};

export default useEvent;
