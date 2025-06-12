import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  selectedBanner: string;
  setSelectedBanner: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedBanner,
    setSelectedBanner,
    refetchBanner,
  } = props;
  const { mutateDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } =
    useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessDeleteBanner) {
      onClose();
      refetchBanner();
      setSelectedBanner("");
    }
  }, [isSuccessDeleteBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader className="font-bold">Delete Banner</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this banner ?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            className="font-semibold text-primary"
            onPress={() => {
              onClose();
              setSelectedBanner("");
            }}
            disabled={isPendingDeleteBanner}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit"
            className="font-semibold"
            onPress={() => mutateDeleteBanner(selectedBanner)}
            disabled={isPendingDeleteBanner}
          >
            {isPendingDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
