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
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const { mutateDeleteTicket, isPendingDeleteTicket, isSuccessDeleteTicket } =
    useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessDeleteTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessDeleteTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader className="font-bold">Delete Ticket</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Ticket ?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            className="font-semibold text-primary"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null);
            }}
            disabled={isPendingDeleteTicket}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit"
            className="font-semibold"
            onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
            disabled={isPendingDeleteTicket}
          >
            {isPendingDeleteTicket ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
