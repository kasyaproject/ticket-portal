import { useEffect } from "react";
import { Controller } from "react-hook-form";
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
import useAddTicketModal from "./useAddTicketModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const AddTicketModal = (props: PropsTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;
  const {
    control,
    errors,
    reset,
    handleAddTicket,
    handleSubmitForm,
    isPendingAddTicket,
    isSuccessAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessAddTicket]);

  const hanldeOnClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={hanldeOnClose}
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader className="font-bold">Add Ticket</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Detail Ticket</p>
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

              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Price"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.price !== undefined}
                    errorMessage={errors.price?.message}
                  />
                )}
              />

              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="quantity"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.quantity !== undefined}
                    errorMessage={errors.quantity?.message}
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
              onPress={hanldeOnClose}
              disabled={isPendingAddTicket}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              className="font-semibold"
              onPress={onClose}
              disabled={isPendingAddTicket}
            >
              {isPendingAddTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddTicketModal;
