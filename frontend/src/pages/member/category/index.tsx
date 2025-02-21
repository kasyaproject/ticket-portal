import DashboardLayout from "@/components/layouts/DashboardLayout";
import MemberCategory from "@/components/views/Member/Category";

const MemberCategoryPage = () => {
  return (
    <DashboardLayout title="Dashboard" desc="Dashboard Member" type="member">
      <MemberCategory />
    </DashboardLayout>
  );
};
export default MemberCategoryPage;
