import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Chip } from "@heroui/react";

import DataTable from "@/components/ui/DataTable";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUM_LISTS_TRANSACTION } from "./Transaction.constant";
import { convertToIDR } from "@/utils/currency";

const MemberTransactionView = () => {
  const { push, isReady, query } = useRouter();
  const { dataTransactions, isLoadingTransactions, isRefetchingTransactions } =
    useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "orderId":
          return (
            <span className="font-semibold text-blue-500">
              {cellValue as string}
            </span>
          );
        case "total":
          return convertToIDR(Number(cellValue));
        case "status":
          return (
            <Chip
              color={cellValue === "complete" ? "success" : "warning"}
              className={
                cellValue
                  ? "text-white font-semibold"
                  : "text-black font-semibold"
              }
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/member/transaction/${transaction.orderId}`)
              }
              hideButtonDelete
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          // Main Content
          columns={COLUM_LISTS_TRANSACTION} // dari data constant
          // data dari hit ke API
          data={dataTransactions?.data || []}
          renderCell={renderCell}
          emptyContent="Transactions is Empty"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          //
          // Bottom Content
          totalPages={dataTransactions?.pagination.totalPage}
        />
      )}
    </section>
  );
};

export default MemberTransactionView;
