import { useEffect } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";
import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useImageTab from "./useImageTab";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteBanner,
    handleUploadBanner,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateBanner();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event cover banner</h1>
        <p className="w-full text-small text-default-400">
          Manage banner of this event
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateBanner(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current banner
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="rounded-lg aspect-video"
            >
              <Image
                src={currentImage}
                alt="Img-Icon"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>

            <Controller
              name="image"
              control={controlUpdateBanner}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteBanner(onChange)}
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isDeleting={isPendingDeleteFile}
                  isInvalid={errorsUpdateBanner.image !== undefined}
                  errorMessage={errorsUpdateBanner.image?.message}
                  isDropable
                  label="Upload new image"
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />

            <Button
              color="primary"
              className="mt-2 disabled:bg-default-500"
              type="submit"
              disabled={isPendingUploadFile || isPendingUpdate || !preview}
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white"></Spinner>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default ImageTab;
