import { useRouter } from "next/router";
import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";

const usePayment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;

  const standelizedStatus = (status: string) => {
    switch (status) {
      case "success":
        return "completed";
      case "progress":
        return "pending";
      case "failed":
        return "cancelled";
      default:
        return status;
    }
  };

  const updateOrderStatus = async () => {
    const result = await orderServices.updateOrderStatus(
      `${order_id}`,
      standelizedStatus(`${status}`),
    );

    return result.data;
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
  });

  return { mutateUpdateOrderStatus };
};

export default usePayment;
