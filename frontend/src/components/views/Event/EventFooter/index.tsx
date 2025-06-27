import { LIMIT_LISTS } from "@/constants/list.const";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@heroui/react";
import React from "react";

interface PropTypes {
  totalPages: number;
}

const EventFooter = (props: PropTypes) => {
  const { totalPages } = props;
  const { currentLimit, currentPage, handleChangeLimit, handleChangePage } =
    useChangeUrl();

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 lg:justify-between lg:flex-row">
        <Select
          className="max-w-28 "
          size="md"
          selectedKeys={[`${currentLimit}`]}
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show: </p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <Pagination
          isCompact
          showControls
          color="primary"
          page={Number(currentPage)}
          total={totalPages}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default EventFooter;
