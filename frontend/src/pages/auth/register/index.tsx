import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="Ticket Portal | Register">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
