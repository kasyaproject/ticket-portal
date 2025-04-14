import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteEventModal from "./useDeleteEventModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
  selectedEvent: string;
  setSelectedEvent: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedEvent,
    setSelectedEvent,
    refetchEvent,
  } = props;
  const { mutateDeleteEvent, isPendingDeleteEvent, isSuccessDeleteEvent } =
    useDeleteEventModal();

  useEffect(() => {
    if (isSuccessDeleteEvent) {
      onClose();
      refetchEvent();
    }
  }, [isPendingDeleteEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader className="font-bold">Delete Event</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Event ?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            className="font-semibold text-primary"
            onPress={() => {
              onClose();
              setSelectedEvent("");
            }}
            disabled={isPendingDeleteEvent}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit"
            className="font-semibold"
            onPress={() => mutateDeleteEvent(selectedEvent)}
            disabled={isPendingDeleteEvent}
          >
            {isPendingDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
