import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import useMediaHandling from "@/hooks/useMediaHandling";

const schema = yup.object().shape({
  name: yup.string().required("Please input category name"),
  description: yup.string().required("Please input category description"),
  icon: yup.mixed<FileList | string>().required("Please input category icon"),
});

const useAddCategoryModal = () => {
  const {
    isPendingUploadFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  // Untuk upload image agar bisa di preview
  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  // Untuk delete image
  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // Membersihkan form modal saat di close
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  // Digunakan untuk menambahkan detail kategori baru
  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);

    return res;
  };

  // Menambahkan kategori baru
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

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleAddCategory,
    handleOnClose,
    handleSubmitForm,
    isPendingAddCategory,
    isSuccessAddCategory,

    handleUploadIcon,
    isPendingUploadFile,
    handleDeleteIcon,
    isPendingDeleteFile,
    preview,
  };
};

export default useAddCategoryModal;
