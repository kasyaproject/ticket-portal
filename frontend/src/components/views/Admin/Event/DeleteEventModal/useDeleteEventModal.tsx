import eventServices from "@/services/event.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);

    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingDeleteEvent,
    isSuccess: isSuccessDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      addToast({
        title: "Delete Event Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Event Success",
        description: "Success delete Event 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  return {
    mutateDeleteEvent,
    isPendingDeleteEvent,
    isSuccessDeleteEvent,
  };
};
export default useDeleteEventModal;
