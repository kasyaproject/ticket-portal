import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataEvent?.name}`);
    setValueUpdateInfo("description", `${dataEvent?.description}`);
    setValueUpdateInfo("slug", `${dataEvent?.slug}`);
    setValueUpdateInfo("category", `${dataEvent?.category}`);
    setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
    setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
    setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
    setValueUpdateInfo("isFetured", `${dataEvent?.isFetured}`);
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 xl:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Detail Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this event detail
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  variant="bordered"
                  type="text"
                  defaultValue={dataEvent?.name}
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Slug"
                  variant="bordered"
                  type="text"
                  defaultValue={dataEvent?.slug}
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  className="w-full"
                  label="Event Category"
                  variant="bordered"
                  defaultSelectedKey={dataEvent?.category}
                  onSelectionChange={(value) => onChange(value)}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
              <Controller
                name="startDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Event Start Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    hideTimeZone
                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
              <Controller
                name="endDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Event End Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    hideTimeZone
                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                    errorMessage={errorsUpdateInfo.endDate?.message}
                  />
                )}
              />
            </Skeleton>
          </div>

          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  type="text"
                  defaultValue={dataEvent?.description}
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isPublish"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status Event"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isPublish !== undefined}
                  errorMessage={errorsUpdateInfo.isPublish?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isPublish ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true" value="true">
                    Publish
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Not Publish
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isFetured"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured Event"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isFetured !== undefined}
                  errorMessage={errorsUpdateInfo.isFetured?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isFetured ? "true" : "false",
                  ]}
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
          </Skeleton>

          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataEvent?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
