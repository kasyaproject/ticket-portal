import React from "react";
import Image from "next/image";
import { IBanner } from "@/types/Banner";
import { Skeleton } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

const HomeSlidder = (props: PropTypes) => {
  const { banners, isLoadingBanners } = props;

  return (
    <div className="mx-6 mb-6 h-[25vw] lg:h-60 lg:mx-0 lg:mb-12 ">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="w-full h-full rounded-2xl"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <Image
                src={`${banner.image}`}
                alt={`${banner.title}`}
                className="h-full w-full rounded-2xl object-cover lg:h-[90%]"
                width={1920}
                height={800}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[90%] w-full rounded-2xl" />
      )}
    </div>
  );
};

export default HomeSlidder;
