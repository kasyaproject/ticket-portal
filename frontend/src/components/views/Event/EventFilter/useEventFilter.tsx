import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  isOnline: yup.string(),
  isFetured: yup.string(),
});

const useEventFilter = () => {
  const router = useRouter();

  const { control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // Ambil data category event dari API untuk modal ADD
  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return { control, setValue, dataCategory, isSuccessGetCategory };
};

export default useEventFilter;
