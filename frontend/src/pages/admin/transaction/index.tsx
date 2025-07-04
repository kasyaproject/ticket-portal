import DashboardLayout from "@/components/layouts/DashboardLayout";
import MemberTransactionView from "@/components/views/Admin/Transaction";

const AdminTransactionPage = () => {
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

export default AdminTransactionPage;
