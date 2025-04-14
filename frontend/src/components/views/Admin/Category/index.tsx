import DataTable from "@/components/ui/DataTable";
import { Image, useDisclosure } from "@heroui/react";
// import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUM_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const AdminCategoryView = () => {
  const { push, isReady, query } = useRouter();
  const {
    selectedCategory,
    setSelectedCategory,
    dataCategory,
    isRefetchingCategory,
    refetchCategory,
    isLoadingCategory,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={100} />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedCategory(`${category._id}`);
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
          buttonTopContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          //
          // Main Content
          columns={COLUM_LISTS_CATEGORY} // dari data constant
          // data dari hit ke API
          data={dataCategory?.data || []}
          renderCell={renderCell}
          emptyContent="Category is Empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          //
          // Bottom Content
          totalPages={dataCategory?.pagination.totalPage}
        />
      )}

      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />

      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default AdminCategoryView;
