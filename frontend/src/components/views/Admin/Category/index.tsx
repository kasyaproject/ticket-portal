import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
// import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUM_LISTS_CATEGORY } from "./category.constant";
import useCategory from "./useCategory";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentPage,
    dataCategory,
    isRefetchingCategory,
    currentLimit,
    isLoadingCategory,

    setURL,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeLimit,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={100} />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem key="delete-category" className="text-primary">
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
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
          currentPage={Number(currentPage)}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Category;
