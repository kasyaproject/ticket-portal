import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  // Untuk Upload Gambar
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);

    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          title: "Upload file failed",
          description: error.message + " 😢",
          variant: "bordered",
          color: "danger",
        });
      },
    });

  // Untuk Delete Gambar
  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const response = await uploadServices.deleteFile({ fileUrl });

    if (response.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteIcon(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          title: "Delete file failed",
          description: error.message + " 😢",
          variant: "bordered",
          color: "danger",
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  };
};

export default useMediaHandling;
