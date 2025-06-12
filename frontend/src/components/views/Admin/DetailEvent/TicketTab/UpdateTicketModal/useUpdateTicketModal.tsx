import { ITicket } from "@/types/Ticket";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import ticketServices from "@/services/ticket.service";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup.string().required("Please input ticket name"),
  description: yup.string().required("Please input ticket description"),
  price: yup.string().required("Please input ticket price"),
  quantity: yup.string().required("Please input ticket quantity"),
});

const useUpdateTicketModal = (id: string) => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Digunakan untuk menambahkan detail kategori baru
  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);

    return res;
  };

  // Menambahkan kategori baru
  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingUpdateTicket,
    isSuccess: isSuccessUpdateTicket,
  } = useMutation({
    mutationKey: ["updateTicket"],
    mutationFn: updateTicket,
    onError: (error) => {
      addToast({
        title: "Update Ticket Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Update Ticket Success",
        description: "Success to update new Ticket 😊",
        variant: "bordered",
        color: "success",
      });
      reset();
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`; // Ambil id event dari URL
    // Convert price and quantity to number
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);

    // Call the mutation to Update the ticket
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
