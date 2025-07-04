import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfile = () => {
  const { isReady } = useRouter();

  // hit ke API untuk data Profile
  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  // API update profile
  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);

    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      addToast({
        title: "Update Profile Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchProfile();
      addToast({
        title: "Update Profile Success",
        description: "Success Update profile info 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
    dataProfile,

    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdateProfile,
  };
};
export default useProfile;
