import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  // ambil data categori dari API dengan parameter params yang sudah ada/baru
  const getMemberTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const { data } = await orderServices.getMemberOrders(params);

    return data;
  };

  // digunakan untuk refetch data seperti search/page/limit
  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
  } = useQuery({
    queryKey: ["MemberTransaction", currentPage, currentLimit, currentSearch],
    queryFn: () => getMemberTransactions(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
  };
};

export default useTransaction;
