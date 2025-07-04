import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile picture</h1>
        <p className="w-full text-small text-default-400">
          Manage picture for your profile
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current picture
            </p>

            {!!currentPicture ? (
              <div className="w-1/2 rounded-lg aspect-square">
                <Avatar
                  src={currentPicture}
                  alt="picture"
                  showFallback
                  className="w-full h-full aspect-square"
                />
              </div>
            ) : (
              <Skeleton className="w-1/2 rounded-full aspect-square" />
            )}

            <Controller
              name="profilePicture"
              control={controlUpdatePicture}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isDeleting={isPendingDeleteFile}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  isDropable
                  label="Upload new profile picture"
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
export default PictureTab;
