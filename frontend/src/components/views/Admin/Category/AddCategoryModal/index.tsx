import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropsTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingAddFile,
    isPendingAddCategory,
    isSuccessAddCategory,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Informations</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onChange={(e) => {
                      onChange(e.currentTarget.files);
                    }}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
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
              onPress={onClose}
              disabled={isPendingAddCategory || isPendingAddFile}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              className="font-semibold"
              onPress={onClose}
              disabled={isPendingAddCategory || isPendingAddFile}
            >
              {isPendingAddCategory || isPendingAddFile ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddCategoryModal;
