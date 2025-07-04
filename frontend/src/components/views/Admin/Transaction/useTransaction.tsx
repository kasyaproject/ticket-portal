import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState("");

  // ambil data categori dari API dengan parameter params yang sudah ada/baru
  const getTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const { data } = await orderServices.getOrders(params);

    return data;
  };

  // digunakan untuk refetch data seperti search/page/limit
  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["Transaction", currentPage, currentLimit, currentSearch],
    queryFn: () => getTransactions(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransaction,

    selectedId,
    setSelectedId,
  };
};

export default useTransaction;
