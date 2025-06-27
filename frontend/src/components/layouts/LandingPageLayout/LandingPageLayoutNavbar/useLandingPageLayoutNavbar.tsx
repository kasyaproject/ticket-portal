import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.const";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounce = useDebounce();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  // ambil data Event dari API dengan parameter params
  const getEventsSearch = async () => {
    const params = `search=${search}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;
    const res = await eventServices.getEvents(params);
    const { data } = res;

    return data;
  };

  // Query Event
  const {
    data: dataEventsSearch,
    isLoading: isLoadingdEventsSearch,
    isRefetching: isRefetchingSearch,
  } = useQuery({
    queryKey: ["EventsSearch"],
    queryFn: getEventsSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,

    dataEventsSearch,
    isLoadingdEventsSearch,
    isRefetchingSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useLandingPageLayoutNavbar;
