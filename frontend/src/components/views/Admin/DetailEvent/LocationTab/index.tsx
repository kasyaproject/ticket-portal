import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { IRegency } from "@/types/Category.d copy";
import useLocationTab from "./useLocationTab";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  dataDefaultRegency: string;
  isPendingDefaultRegion: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    dataDefaultRegency,
    isPendingDefaultRegion,
  } = props;
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegion,
    searchRegion,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
    setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
    setValueUpdateLocation(
      "latitude",
      `${dataEvent?.location?.coordinates[0]}`,
    );
    setValueUpdateLocation(
      "longitude",
      `${dataEvent?.location?.coordinates[1]}`,
    );
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 xl:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Detail Location</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this event location
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online/Offline Event"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}
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

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegion?.data.data && searchRegion !== ""
                        ? dataRegion?.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegency}
                    className="w-full"
                    label="Event Region"
                    variant="bordered"
                    onInputChange={(search) => handleSearchRegion(search)}
                    onSelectionChange={(value) => onChange(value)}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                  >
                    {(regions: IRegency) => (
                      <AutocompleteItem key={`${regions.id}`}>
                        {regions.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <div className="h-14 w-full" />
            )}
          </Skeleton>

          <div className="grid lg:grid-cols-2 gap-4">
            <Skeleton
              isLoaded={!!dataEvent?.location?.coordinates[0]}
              className="rounded-lg"
            >
              <Controller
                name="latitude"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Latitude"
                    variant="bordered"
                    type="text"
                    defaultValue={dataEvent?.latitude}
                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                    errorMessage={errorsUpdateLocation.latitude?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataEvent?.location?.coordinates[1]}
              className="rounded-lg"
            >
              <Controller
                name="longitude"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Longitude"
                    variant="bordered"
                    type="text"
                    defaultValue={dataEvent?.longitude}
                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                    errorMessage={errorsUpdateLocation.longitude?.message}
                  />
                )}
              />
            </Skeleton>
          </div>

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
export default LocationTab;
