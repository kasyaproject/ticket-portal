import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminCategory from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      desc="List of all Categories, create new category, and manage existing categories."
      type="admin"
    >
      <AdminCategory />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
