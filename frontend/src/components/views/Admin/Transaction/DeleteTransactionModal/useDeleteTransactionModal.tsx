import orderServices from "@/services/order.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteTransactionModal = () => {
  const deleteTransaction = async (id: string) => {
    const res = await orderServices.deleteOrder(id);

    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingDeleteTransaction,
    isSuccess: isSuccessDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onError: (error) => {
      addToast({
        title: "Delete Transaction Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Transaction Success",
        description: "Success delete Transaction 😊",
        variant: "bordered",
        color: "success",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingDeleteTransaction,
    isSuccessDeleteTransaction,
  };
};
export default useDeleteTransactionModal;
