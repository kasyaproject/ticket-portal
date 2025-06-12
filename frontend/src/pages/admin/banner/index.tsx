import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminBanner from "@/components/views/Admin/Banner";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      desc="List of all Banners, create new banner, and manage existing banners."
      type="admin"
    >
      <AdminBanner />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
