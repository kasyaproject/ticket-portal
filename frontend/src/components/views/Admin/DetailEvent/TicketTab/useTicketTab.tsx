import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ticketServices from "@/services/ticket.service";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  // hit ke API untuk data category
  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(`${query.id}`);

    return data.data;
  };

  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Ticket"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
  };
};

export default useTicketTab;
