import React from "react";
import PaymentView from "../../components/views/Payment";
import AuthLayout from "@/components/layouts/AuthLayout";

const EventPage = () => {
  return (
    <AuthLayout title="Payment success">
      <PaymentView />
    </AuthLayout>
  );
};

export default EventPage;
