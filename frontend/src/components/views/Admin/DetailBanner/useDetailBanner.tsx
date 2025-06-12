import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IBanner } from "@/types/Banner";
import { addToast } from "@heroui/toast";
import bannerServices from "@/services/banner.service";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(`${query.id}`, payload);

    return data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingUpdateBanner,
    isSuccess: isSuccessUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      addToast({
        title: "Update Banner Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchBanner();
      addToast({
        title: "Update Banner Success",
        description: "Success Upate Banner info 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  // hit ke API untuk update banner
  const handleUpdateBanner = (data: IBanner) => {
    mutateUpdateBanner(data);
  };

  // hit ke API untuk update banner info
  const handleUpdateBannerInfo = (data: IBanner) => {
    const payload = {
      ...data,
      isShow: data.isShow === "true" ? true : false,
    };

    mutateUpdateBanner(payload);
  };

  // hit ke API untuk data category
  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);

    return data.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner"],
    queryFn: getBannerById,
    enabled: isReady,
  });

  return {
    dataBanner,

    handleUpdateBanner,
    handleUpdateBannerInfo,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  };
};
export default useDetailBanner;
