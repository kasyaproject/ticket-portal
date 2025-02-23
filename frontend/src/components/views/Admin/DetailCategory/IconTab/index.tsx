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
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: { icon: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="rounded-lg aspect-square"
            >
              <Image
                src={currentIcon}
                alt="Img-Icon"
                fill
                className="!relative"
              />
            </Skeleton>

            <Controller
              name="icon"
              control={controlUpdateIcon}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteIcon(onChange)}
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isDeleting={isPendingDeleteFile}
                  isInvalid={errorsUpdateIcon.icon !== undefined}
                  errorMessage={errorsUpdateIcon.icon?.message}
                  isDropable
                  label="Upload new Icon"
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
