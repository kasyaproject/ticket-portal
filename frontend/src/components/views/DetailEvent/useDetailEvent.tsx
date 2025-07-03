import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { defaultCart } from "./DetailEvent.constant";
import orderServices from "@/services/order.service";
import { addToast } from "@heroui/toast";

const useDetailEvent = () => {
  const router = useRouter();
  const [cart, setCart] = useState<ICart>(defaultCart);

  // hit ke API untuk data Event
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);

    return data.data;
  };

  const { data: dataDetailEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  // hit ke API untuk data Ticket berdasarkan id Event
  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(
      `${dataDetailEvent._id}`,
    );

    return data.data;
  };

  const { data: dataTicketsByEventId } = useQuery({
    queryKey: ["TicketsByEventId"],
    queryFn: getTicketsByEventId,
    enabled: !!dataDetailEvent?._id,
  });

  const dataTicketInCart = useMemo(() => {
    if (dataTicketsByEventId) {
      return dataTicketsByEventId.find(
        (ticket: ITicket) => ticket._id === cart.ticket,
      );
    }

    return null;
  }, [dataTicketsByEventId, cart]);

  // Handle untuk menambahkan Ticket ke Cart
  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataDetailEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  // Handle untuk mengurangi jumlah quantity ticket berdasarkan cart
  const handleChangeQuantity = (type: "increment" | "decrement") => {
    // Menambah ticket ke Cart
    if (type === "increment") {
      // Cek apakah ticket masih ada quantity nya / Sold Out (agar jumlah ticket di cart tidak lebih dari quantity ticket)
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    }
    // Menghapus Ticket dari Cart
    else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  const createOrder = async () => {
    const { data } = await orderServices.createOrder(cart);

    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        addToast({
          title: "Create Order Failed",
          description: error.message + " 😢",
          variant: "bordered",
          color: "danger",
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;

        window.snap.pay(transactionToken);
      },
    });

  return {
    dataDetailEvent,
    dataTicketsByEventId,
    dataTicketInCart,

    cart,
    handleAddToCart,
    handleChangeQuantity,

    mutateCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
