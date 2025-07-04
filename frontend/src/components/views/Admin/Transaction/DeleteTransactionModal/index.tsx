import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTransaction: () => void;
  selectedTransaction: string;
  setSelectedTransaction: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedTransaction,
    setSelectedTransaction,
    refetchTransaction,
  } = props;
  const {
    mutateDeleteTransaction,
    isPendingDeleteTransaction,
    isSuccessDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessDeleteTransaction) {
      onClose();
      refetchTransaction();
      setSelectedTransaction("");
    }
  }, [isSuccessDeleteTransaction]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader className="font-bold">Delete Transaction</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Transaction ?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            className="font-semibold text-primary"
            onPress={() => {
              onClose();
              setSelectedTransaction("");
            }}
            disabled={isPendingDeleteTransaction}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit"
            className="font-semibold"
            onPress={() => mutateDeleteTransaction(selectedTransaction)}
            disabled={isPendingDeleteTransaction}
          >
            {isPendingDeleteTransaction ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Transaction"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
