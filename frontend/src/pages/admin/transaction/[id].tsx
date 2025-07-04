import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const MemberDashboardPage = () => {
  return (
    <DashboardLayout title="Transaction" desc="Transaction Detail" type="admin">
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default MemberDashboardPage;
