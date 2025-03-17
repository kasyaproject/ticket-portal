import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminEvent from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      desc="List of all Events, create new event, and manage existing events."
      type="admin"
    >
      <AdminEvent />
    </DashboardLayout>
  );
};
export default AdminEventPage;
