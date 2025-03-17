import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, Image, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUM_LISTS_EVENT } from "./event.constant";
import useEvent from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";

const AdminEventView = () => {
  const { push, isReady, query } = useRouter();
  const addEventModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const {
    selectedEvent,
    setSelectedEvent,

    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  } = useEvent();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${cellValue}`}
              alt="banner-event"
              className="w-36 rounded-lg aspect-video object-cover"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "default"}
              className={
                cellValue
                  ? "text-white font-semibold"
                  : "text-black font-semibold"
              }
            >
              {cellValue === true ? "Publish" : "Not Publish"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedEvent(`${event._id}`);
                deleteCategoryModal.onOpen();
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
          // Top Content
          buttonTopContentLabel="Create Event"
          onClickButtonTopContent={addEventModal.onOpen}
          // Main Content
          columns={COLUM_LISTS_EVENT} // dari data constant
          // data dari hit ke API
          data={dataEvent?.data || []}
          renderCell={renderCell}
          emptyContent="Event is Empty"
          isLoading={isLoadingEvent || isRefetchingEvent}
          // Bottom Content
          totalPages={dataEvent?.pagination.totalPage}
        />
      )}

      {/* <AddCategoryModal {...addEventModal} refetchCategory={refetchEvent} />

      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedCategory={selectedEvent}
        setSelectedCategory={setSelectedEvent}
        refetchCategory={refetchEvent}
      /> */}
    </section>
  );
};
export default AdminEventView;
