import bannerServices from "@/services/banner.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = () => {
  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);

    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingDeleteBanner,
    isSuccess: isSuccessDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError: (error) => {
      addToast({
        title: "Delete Banner Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Banner Success",
        description: "Success delete Banner 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingDeleteBanner,
    isSuccessDeleteBanner,
  };
};
export default useDeleteBannerModal;
