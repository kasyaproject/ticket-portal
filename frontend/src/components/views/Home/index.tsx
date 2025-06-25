import { Skeleton } from "@heroui/react";
import HomeSlidder from "./HomeSlidder";
import useHome from "./useHome";
import Image from "next/image.js";
import HomeListCategory from "./HomeListCategory";
import HomeListEvent from "./HomeListEvent.tsx";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanner,

    dataFeaturedEvents,
    isLoadingdFeaturedEvents,

    dataLatestEvents,
    isLoadingdLatestEvents,

    dataCategories,
    isLoadingCategory,
  } = useHome();

  return (
    <div>
      <HomeSlidder
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanner}
      />

      <HomeListEvent
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingdFeaturedEvents}
      />

      <Skeleton
        className="px-6 mb-6 lg:h-[15vw] w-full rounded-2xl lg:px-0 lg:mb-12 "
        isLoaded={!isLoadingBanner}
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          className="lg:h-[15vw] h-40 md:h-60 w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        ></Image>
      </Skeleton>

      <HomeListEvent
        title="Leatest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingdLatestEvents}
      />

      <HomeListCategory
        dataCategories={dataCategories?.data}
        isLoadingCategories={isLoadingCategory}
      />
    </div>
  );
};

export default Home;
