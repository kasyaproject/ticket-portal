import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

const schema = yup.object().shape({
  name: yup.string().required("Must input category name"),
  description: yup.string().required("Must input category description"),
  icon: yup.mixed<FileList>().required("Must input category icon"),
});

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Digunakan untuk upload file icon dari category
  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();
    formData.append("file", data.icon[0]);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);

    return { name: data.name, description: data.description, icon };
  };

  // Digunakan untuk menambahkan detail kategori baru
  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);

    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategory,
    onError: (error) => {
      addToast({
        title: "Add Category Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Add Category Success",
        description: "Success to add new category 😊",
        variant: "bordered",
        color: "success",
      });
      reset();
    },
  });

  const { mutate: mutateAddFile, isPending: isPendingAddFile } = useMutation({
    mutationFn: uploadIcon,
    onError: (error) => {
      addToast({
        title: "Add Icon Category Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: (payload) => {
      mutateAddCategory(payload);
    },
  });

  const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingAddFile,
    isPendingAddCategory,
    isSuccessAddCategory,
  };
};

export default useAddCategoryModal;
