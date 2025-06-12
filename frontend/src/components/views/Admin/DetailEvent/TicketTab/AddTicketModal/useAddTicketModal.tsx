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

const useAddTicketModal = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Digunakan untuk menambahkan detail kategori baru
  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);

    return res;
  };

  // Menambahkan kategori baru
  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationKey: ["addTicket"],
    mutationFn: addTicket,
    onError: (error) => {
      addToast({
        title: "Add Ticket Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Add Ticket Success",
        description: "Success to add new Ticket 😊",
        variant: "bordered",
        color: "success",
      });
      reset();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`; // Ambil id event dari URL
    // Convert price and quantity to number
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);

    // Call the mutation to add the ticket
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  };
};

export default useAddTicketModal;
