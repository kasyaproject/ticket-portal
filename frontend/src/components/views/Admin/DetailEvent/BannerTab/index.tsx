import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useBannerTab from "./useBannerTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
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
  } = useBannerTab();

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
              isLoaded={!!currentIcon}
              className="rounded-lg aspect-video"
            >
              <Image
                src={currentIcon}
                alt="Img-Icon"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>

            <Controller
              name="banner"
              control={controlUpdateBanner}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteBanner(onChange)}
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isDeleting={isPendingDeleteFile}
                  isInvalid={errorsUpdateBanner.banner !== undefined}
                  errorMessage={errorsUpdateBanner.banner?.message}
                  isDropable
                  label="Upload new banner"
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
export default IconTab;
