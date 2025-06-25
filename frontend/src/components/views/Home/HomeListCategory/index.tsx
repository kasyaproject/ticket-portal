import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  dataCategories: ICategory[];
  isLoadingCategories: boolean;
}

const HomeListCategory = (props: PropTypes) => {
  const { dataCategories, isLoadingCategories } = props;

  return (
    <Card className="p-8 mx-5 mb-8 lg:mx-0">
      <CardHeader>
        <h2 className="text-2xl font-bold text-primary">Event by Category</h2>
      </CardHeader>

      <CardBody className="p-0 mt-4">
        <div className="grid auto-cols-[10rem] pb-5 grid-flow-col gap-4 overflow-x-auto lg:grid-cols-7">
          {!isLoadingCategories
            ? dataCategories?.map((category) => (
                <Link
                  key={`category-${category._id}`}
                  href={`/event?category=${category._id}`}
                  className="flex flex-col items-center justify-center gap-2 p-4 border cursor-pointer aspect-square rounded-xl"
                >
                  <Image
                    src={`${category.icon}`}
                    alt={`${category.name}`}
                    width={100}
                    height={100}
                    className="1/2"
                  ></Image>

                  <p className="font-bold text-medium"> {category.name}</p>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={`list-category-skeleton-${i}`}
                  className="aspect-square rounded-xl"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeListCategory;
