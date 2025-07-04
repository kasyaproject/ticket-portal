import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input cover profilePicture event"),
});

const usePictureTab = () => {
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  // Resolver untuk Update profilePicture Event
  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdateBanner,
    getValues: getValuesUpdateBanner,
    setValue: setValueUpdateBanner,
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner),
  });

  const preview = watchUpdateBanner("profilePicture");
  const fileUrl = getValuesUpdateBanner("profilePicture");

  // Untuk upload image agar bisa di preview
  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateBanner("profilePicture", fileUrl);
      }
    });
  };

  // Untuk delete image
  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeletePicture,
    handleUploadPicture,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  };
};
export default usePictureTab;
