import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Chip, useDisclosure } from "@heroui/react";

import DataTable from "@/components/ui/DataTable";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUM_LISTS_TRANSACTION } from "./Transaction.constant";
import { convertToIDR } from "@/utils/currency";
import DeleteTransactionModal from "./DeleteTransactionModal";

const MemberTransactionView = () => {
  const { push, isReady, query } = useRouter();
  const { setUrl } = useChangeUrl();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransaction,

    selectedId,
    setSelectedId,
  } = useTransaction();

  const deleteTransactionModal = useDisclosure();

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
                push(`/admin/transaction/${transaction.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransactionModal.onOpen();
              }}
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

      <DeleteTransactionModal
        {...deleteTransactionModal}
        selectedTransaction={selectedId}
        setSelectedTransaction={setSelectedId}
        refetchTransaction={refetchTransaction}
      />
    </section>
  );
};

export default MemberTransactionView;
