import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const DeleteCategoryModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedCategory,
    setSelectedCategory,
    refetchCategory,
  } = props;
  const {
    mutateDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessDeleteCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader className="font-bold">Delete Category</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this category ?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            className="font-semibold text-primary"
            onPress={() => {
              onClose();
              setSelectedCategory("");
            }}
            disabled={isPendingDeleteCategory}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit"
            className="font-semibold"
            onPress={() => mutateDeleteCategory(selectedCategory)}
            disabled={isPendingDeleteCategory}
          >
            {isPendingDeleteCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
