import React, { Fragment, Key, ReactNode, use, useCallback } from "react";
// import UseTicketTab from "./UseTicketTab"; // Adjust the import path as necessary
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { COLUM_LISTS_TICKET } from "./TicketTab.constant";
import { convertToIDR } from "@/utils/currency";
import DataTable from "@/components/ui/DataTable";
import DropdownAction from "@/components/commons/DropdownAction";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertToIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4 xl:w-1/2">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-start w-full gap-2">
            <h1 className="w-full text-xl font-bold">Event Detail Ticket</h1>
            <p className="w-full text-small text-default-400">
              Manage information of this event ticket
            </p>
          </div>

          <Button color="primary" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>

        <CardBody className="pt-0">
          <DataTable
            // Top Content
            showSearch={false} // untuk menampilkan search
            showLimit={false} // untuk menampilkan limit
            // Main Content
            columns={COLUM_LISTS_TICKET} // dari data constant
            // data dari hit ke API
            data={dataTicket || []}
            renderCell={renderCell}
            emptyContent="Ticket is empty" // untuk menampilkan ketika data kosong
            isLoading={isPendingTicket || isRefetchingTicket} // untuk menampilkan loading
            // Bottom Content
            totalPages={1}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
    </Fragment>
  );
};

export default TicketTab;
