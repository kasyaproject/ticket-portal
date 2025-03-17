import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";
import useIconTab from "./IconTab/useIconTab";
import useInfoTab from "./InfoTab/useInfoTab";

const DetailCategoryView = () => {
  const {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = useDetailCategory();

  const { isPendingUploadFile } = useIconTab();

  const {} = useInfoTab();

  return (
    <Tabs>
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingUploadFile}
          isSuccessUpdate={isSuccessUpdateCategory}
        />
      </Tab>

      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingUpdateCategory}
          isSuccessUpdate={isSuccessUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};
export default DetailCategoryView;
