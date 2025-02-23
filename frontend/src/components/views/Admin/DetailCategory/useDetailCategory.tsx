import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      addToast({
        title: "Update Category Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchCategory();
      addToast({
        title: "Update Category Success",
        description: "Success Upate category info 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  // hit ke API untuk detail category
  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);

    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  };
};
export default useDetailCategory;
