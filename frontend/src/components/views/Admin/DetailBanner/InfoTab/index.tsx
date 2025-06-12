import {
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
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataBanner?.title}`);
    setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner]);

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
          <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="title"
                  variant="bordered"
                  type="text"
                  defaultValue={dataBanner?.title}
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
            <Controller
              name="isShow"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status Event"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isShow !== undefined}
                  errorMessage={errorsUpdateInfo.isShow?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
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
            disabled={isPendingUpdate || !dataBanner?._id}
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
