import bannerServices from "@/services/banner.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input banner title"),
  isShow: yup.string().required("Please input banner status"),
});

const useInfoTab = () => {
  const router = useRouter();

  // Resolver untuk Update Info Event
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  // Ambil data banner event dari API untuk modal ADD
  const { data: dataBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: () => bannerServices.getBanners(),
    enabled: router.isReady,
  });

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataBanner,
  };
};
export default useInfoTab;
