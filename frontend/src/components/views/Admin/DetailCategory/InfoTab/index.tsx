import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props;
  console.log({ dataCategory });

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Info</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this category
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Input
              type="text"
              className="mt-2"
              label="Name"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.name}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Textarea
              className="mt-2"
              label="Description"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.description}
            />
          </Skeleton>

          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
