import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionView from "@/components/views/Member/Transaction";

const MemberTransactionPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      desc="Transaction History"
      type="member"
    >
      <TransactionView />
    </DashboardLayout>
  );
};
export default MemberTransactionPage;
