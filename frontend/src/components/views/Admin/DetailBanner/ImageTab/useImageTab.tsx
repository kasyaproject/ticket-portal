import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  image: yup
    .mixed<FileList | string>()
    .required("Please input cover image event"),
});

const useImageTab = () => {
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  // Resolver untuk Update image Event
  const {
    control: controlUpdateBanner,
    handleSubmit: handleSubmitUpdateBanner,
    formState: { errors: errorsUpdateBanner },
    reset: resetUpdateBanner,
    watch: watchUpdateBanner,
    getValues: getValuesUpdateBanner,
    setValue: setValueUpdateBanner,
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner),
  });

  const preview = watchUpdateBanner("image");
  const fileUrl = getValuesUpdateBanner("image");

  // Untuk upload image agar bisa di preview
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateBanner("image", fileUrl);
      }
    });
  };

  // Untuk delete image
  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeleteBanner,
    handleUploadBanner,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,

    preview,
  };
};
export default useImageTab;
