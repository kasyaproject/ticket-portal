import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input event name"),
  slug: yup.string().required("Please input event slug"),
  category: yup.string().required("Please select event category"),
  startDate: yup.mixed<DateValue>().required("Please select event start date"),
  endDate: yup.mixed<DateValue>().required("Please select event end date"),
  isPublish: yup.string().required("Please select event status"),
  isFetured: yup.string().required("Please select event featured"),
  description: yup.string().required("Please input event description"),
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

  // Ambil data category event dari API untuk modal ADD
  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
  };
};
export default useInfoTab;
