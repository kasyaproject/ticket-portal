import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddBannerModal = (props: PropsTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;

  const {
    control,
    errors,
    handleAddBanner,
    handleOnClose,
    handleSubmitForm,
    isPendingAddBanner,
    isSuccessAddBanner,

    handleUploadImage,
    isPendingUploadFile,
    isPendingDeleteFile,
    preview,
  } = useAddBannerModal();

  const disableSubmit =
    isPendingAddBanner || isPendingUploadFile || isPendingDeleteFile;

  useEffect(() => {
    if (isSuccessAddBanner) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader className="font-bold">Add Banner</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Detail Banner</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                )}
              />

              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status Event"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" value="true">
                      Publish
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      Not Publish
                    </SelectItem>
                  </Select>
                )}
              />

              <p className="text-sm font-semibold">Image Banner</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    // onDelete={() => handleUploadImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingUploadFile}
                    isDeleting={isPendingDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              className="font-semibold text-primary"
              onPress={() => handleOnClose(onClose)}
              disabled={disableSubmit}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              className="font-semibold"
              onPress={onClose}
              disabled={disableSubmit}
            >
              {isPendingAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddBannerModal;
