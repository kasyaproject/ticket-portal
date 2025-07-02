import { useQuery } from "@tanstack/react-query";
import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.const";
import bannerServices from "@/services/banner.service";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";

const useHome = () => {
  
  // ambil data Banner dari API dengan parameter params yang sudah ada/baru
  const getBanners = async () => {
    const  params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    
    const res = await bannerServices.getBanners(params);
    const { data } = res;

    return data;
  };

  // Query banner
  const { data: dataBanners, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
    enabled: true,
  });

  // ambil data Event dari API dengan parameter params
  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;

    return data;
  };

  // Query Event
  const { data: dataFeaturedEvents, isLoading: isLoadingdFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () =>
        getEvents(
          `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&isFetured=true`,
        ),
      enabled: true,
    });

  // Query Event
  const { data: dataLatestEvents, isLoading: isLoadingdLatestEvents } =
    useQuery({
      queryKey: ["LatestEvents"],
      queryFn: () =>
        getEvents(`limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`),
      enabled: true,
    });

  // ambil data Categories dari API dengan parameter params yang sudah ada/baru
  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;

    const res = await categoryServices.getCategories(params);
    const { data } = res;

    return data;
  };

  // Query Categories
  const { data: dataCategories, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    enabled: true,
  });

  return {
    dataBanners,
    isLoadingBanner,

    dataFeaturedEvents,
    isLoadingdFeaturedEvents,

    dataLatestEvents,
    isLoadingdLatestEvents,

    dataCategories,
    isLoadingCategory,
  };
};

export default useHome;
