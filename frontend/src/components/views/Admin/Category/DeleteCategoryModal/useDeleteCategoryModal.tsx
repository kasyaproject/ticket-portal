import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingDeleteCategory,
    isSuccess: isSuccessDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      addToast({
        title: "Delete Category Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Category Success",
        description: "Success delete category 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  };
};
export default useDeleteCategoryModal;
