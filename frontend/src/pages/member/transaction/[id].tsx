import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const MemberDetailTransactionPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      desc="Transaction Detail"
      type="member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default MemberDetailTransactionPage;
