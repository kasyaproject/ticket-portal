import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const AdminTransactionDetailPage = () => {
  return (
    <DashboardLayout title="Transaction" desc="Transaction Detail" type="admin">
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default AdminTransactionDetailPage;
