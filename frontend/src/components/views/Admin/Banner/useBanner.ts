import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
  const [selectedBanner, setSelectedBanner] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  // ambil data categori dari API dengan parameter params yang sudah ada/baru
  const getBanners = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await bannerServices.getBanners(params);
    const { data } = res;

    return data;
  };

  // digunakan untuk refetch data seperti search/page/limit
  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch],
    queryFn: () => getBanners(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    selectedBanner,
    setSelectedBanner,

    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
  };
};

export default useBanner;
