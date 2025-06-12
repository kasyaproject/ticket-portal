import * as yup from "yup";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { IBanner } from "@/types/Banner";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";

const schema = yup.object().shape({
  title: yup.string().required("Please input banner title"),
  image: yup.mixed<FileList | string>().required("Please input banner image"),
  isShow: yup.string().required("Please input banner status"),
});

const useAddBannerModal = () => {
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

  const preview = watch("image");
  const fileUrl = getValues("image");

  // Untuk upload image agar bisa di preview
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  // Untuk delete image
  const handleDeleteImage = (
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
  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);

    return res;
  };

  // Menambahkan kategori baru
  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationKey: ["addBanner"],
    mutationFn: addBanner,
    onError: (error) => {
      addToast({
        title: "Add Banner Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Add Banner Success",
        description: "Success to add new Banner 😊",
        variant: "bordered",
        color: "success",
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    control,
    errors,
    reset,
    handleAddBanner,
    handleOnClose,
    handleSubmitForm,
    isPendingAddBanner,
    isSuccessAddBanner,

    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,
    preview,
  };
};

export default useAddBannerModal;
