import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminDashboard from "@/components/views/Admin/Dashboard";

const AdminPage = () => {
  return (
    <DashboardLayout title="Dashboard" desc="Dashboard Admin" type="admin">
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminPage;
