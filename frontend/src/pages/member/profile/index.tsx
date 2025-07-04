import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfileView from "@/components/views/Member/Profile";

const MemberTransactionPage = () => {
  return (
    <DashboardLayout title="Profile" desc="Profile Information" type="member">
      <ProfileView />
    </DashboardLayout>
  );
};
export default MemberTransactionPage;
