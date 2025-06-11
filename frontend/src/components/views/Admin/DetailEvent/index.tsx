import { Skeleton, Tab, Tabs } from "@heroui/react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import useIconTab from "./BannerTab/useBannerTab";
import useInfoTab from "./InfoTab/useInfoTab";
import LocationTab from "./LocationTab";

const DetailEventView = () => {
  const {
    dataEvent,

    handleUpoadteBanner,
    handleUpdateEventInfo,
    handleEventLocation,
    isPendingUpdateEvent,
    isSuccessUpdateEvent,

    dataDefaultRegency,
    isPendingDefaultRegion,
  } = useDetailEvent();

  const { isPendingUploadFile } = useIconTab();

  const {} = useInfoTab();

  return (
    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
      <Tabs>
        <Tab key="banner" title="Banner">
          <BannerTab
            currentIcon={dataEvent?.banner}
            onUpdate={handleUpoadteBanner}
            isPendingUpdate={isPendingUploadFile}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>

        <Tab key="info" title="Info">
          <InfoTab
            dataEvent={dataEvent}
            onUpdate={handleUpdateEventInfo}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>

        <Tab key="location" title="Location">
          <LocationTab
            dataEvent={dataEvent}
            dataDefaultRegency={dataDefaultRegency?.data?.data[0]?.name}
            isPendingDefaultRegion={isPendingDefaultRegion}
            onUpdate={handleEventLocation}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>
      </Tabs>
    </Skeleton>
  );
};
export default DetailEventView;
