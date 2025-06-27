import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import EventView from "@/components/views/Event";
import React from "react";

const EventPage = () => {
  return (
    <LandingPageLayout title="Explore Event">
      <EventView />
    </LandingPageLayout>
  );
};

export default EventPage;
