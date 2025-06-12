import DataTable from "@/components/ui/DataTable";
import { Chip, Image, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUM_LISTS_BANNER } from "./banner.constant";
import useBanner from "./useBanner";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const AdminBannerView = () => {
  const { push, isReady, query } = useRouter();
  const {
    selectedBanner,
    setSelectedBanner,

    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="image" width={300} height={100} />
          );
        case "isShow":
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
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedBanner(`${banner._id}`);
                deleteBannerModal.onOpen();
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
          buttonTopContentLabel="Create Banner"
          onClickButtonTopContent={addBannerModal.onOpen}
          //
          // Main Content
          columns={COLUM_LISTS_BANNER} // dari data constant
          // data dari hit ke API
          data={dataBanner?.data || []}
          renderCell={renderCell}
          emptyContent="Banner is Empty"
          isLoading={isLoadingBanner || isRefetchingBanner}
          //
          // Bottom Content
          totalPages={dataBanner?.pagination.totalPage}
        />
      )}

      <AddBannerModal {...addBannerModal} refetchCategory={refetchBanner} />

      <DeleteBannerModal
        {...deleteBannerModal}
        selectedBanner={selectedBanner}
        setSelectedBanner={setSelectedBanner}
        refetchBanner={refetchBanner}
      />
    </section>
  );
};

export default AdminBannerView;
