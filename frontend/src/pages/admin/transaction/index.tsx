import DashboardLayout from "@/components/layouts/DashboardLayout";
import MemberTransactionView from "@/components/views/Admin/Transaction";

const MemberDashboardPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      desc="Transaction History"
      type="admin"
    >
      <MemberTransactionView />
    </DashboardLayout>
  );
};
export default MemberDashboardPage;
