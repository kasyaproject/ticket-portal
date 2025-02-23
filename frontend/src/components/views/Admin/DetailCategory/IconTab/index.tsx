import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  currentIcon: string;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon } = props;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="rounded-lg aspect-square"
            >
              <Image
                src={currentIcon}
                alt="Img-Icon"
                fill
                className="!relative"
              />
            </Skeleton>

            <InputFile name="icon" isDropable label="Upload New Icon" />

            <Button
              color="primary"
              className="mt-2 disabled:bg-default-500"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default IconTab;
