import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const MemberPage = () => {
  return (
    <DashboardLayout title="Dashboard" desc="Dashboard Member" type="member">
      <Dashboard />
    </DashboardLayout>
  );
};
export default MemberPage;
