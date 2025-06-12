import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import ticketServices from "@/services/ticket.service";

const useDeleteTicketModal = () => {
  const deleteTicket = async (id: string) => {
    const res = await ticketServices.deleteTicket(id);

    return res;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingDeleteTicket,
    isSuccess: isSuccessDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onError: (error) => {
      addToast({
        title: "Delete Ticket Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Ticket Success",
        description: "Success delete Ticket 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  return {
    mutateDeleteTicket,
    isPendingDeleteTicket,
    isSuccessDeleteTicket,
  };
};

export default useDeleteTicketModal;
