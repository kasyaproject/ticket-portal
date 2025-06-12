import { Skeleton, Tab, Tabs } from "@heroui/react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import useIconTab from "./ImageTab/useImageTab";
import useInfoTab from "./InfoTab/useInfoTab";

const DetailBannerView = () => {
  const {
    dataBanner,

    handleUpdateBanner,
    handleUpdateBannerInfo,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  } = useDetailBanner();

  const { isPendingUploadFile } = useIconTab();

  const {} = useInfoTab();

  return (
    <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
      <Tabs>
        <Tab key="image" title="Image">
          <ImageTab
            currentImage={dataBanner?.image}
            onUpdate={handleUpdateBanner}
            isPendingUpdate={isPendingUploadFile}
            isSuccessUpdate={isSuccessUpdateBanner}
          />
        </Tab>

        <Tab key="info" title="Info">
          <InfoTab
            dataBanner={dataBanner}
            onUpdate={handleUpdateBannerInfo}
            isPendingUpdate={isPendingUpdateBanner}
            isSuccessUpdate={isSuccessUpdateBanner}
          />
        </Tab>
      </Tabs>
    </Skeleton>
  );
};
export default DetailBannerView;
