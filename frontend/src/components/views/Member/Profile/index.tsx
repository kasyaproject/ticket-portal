import { Skeleton, Tab, Tabs } from "@heroui/react";
import useProfile from "./useProfile";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

const PictureView = () => {
  const {
    dataProfile,

    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdateProfile,
  } = useProfile();

  return (
    <Skeleton isLoaded={!!dataProfile} className="rounded-lg">
      <Tabs>
        <Tab key="picture" title="Picture">
          <PictureTab
            currentPicture={dataProfile?.profilePicture}
            onUpdate={handleUpdateProfile}
            isPendingUpdate={isPendingUpdateProfile}
            isSuccessUpdate={isSuccessUpdateProfile}
          />
        </Tab>

        <Tab key="info" title="Info">
          <InfoTab
            dataProfile={dataProfile}
            onUpdate={handleUpdateProfile}
            isPendingUpdate={isPendingUpdateProfile}
            isSuccessUpdate={isSuccessUpdateProfile}
          />
        </Tab>

        <Tab key="security" title="Security">
          <SecurityTab />
        </Tab>
      </Tabs>
    </Skeleton>
  );
};
export default PictureView;
