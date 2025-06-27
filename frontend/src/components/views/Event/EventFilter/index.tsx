import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";

const EventFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory } =
    useEventFilter();

  const {
    currentCategory,
    currentIsOnline,
    currentIsFeatured,

    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFetured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="w-full p-4 border lg:sticky lg:top-20 h-fit rounded-xl lg:w-80">
      <h4 className="text-xl font-semibold">Event Filter</h4>

      {isSuccessGetCategory ? (
        <div className="flex flex-row gap-4 mt-4 lg:flex-col">
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                defaultSelectedKey={`${currentCategory}`}
                defaultItems={dataCategory?.data.data || []}
                className="w-full"
                label="Event Category"
                variant="bordered"
                onSelectionChange={(value) => {
                  onChange(value);
                  handleChangeCategory(value !== null ? `${value}` : "");
                }}
              >
                {(category: ICategory) => (
                  <AutocompleteItem key={`${category._id}`}>
                    {category.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />

          <Controller
            name="isOnline"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Select
                {...field}
                label="Online/Offline Event"
                variant="bordered"
                defaultSelectedKeys={[`${currentIsOnline}`]}
                onChange={(e) => handleChangeIsOnline(e.target.value)}
              >
                <SelectItem key="true" value="true">
                  Online Event
                </SelectItem>
                <SelectItem key="false" value="false">
                  Offline Event
                </SelectItem>
              </Select>
            )}
          />

          <Controller
            name="isFetured"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Select
                {...field}
                label="Status Event"
                variant="bordered"
                defaultSelectedKeys={[`${currentIsFeatured}`]}
                onChange={(e) => handleChangeIsFeatured(e.target.value)}
              >
                <SelectItem key="true" value="true">
                  Yes
                </SelectItem>
                <SelectItem key="false" value="false">
                  No
                </SelectItem>
              </Select>
            )}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-4 mt-4 lg:flex-col">
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default EventFilter;
