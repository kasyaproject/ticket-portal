import { Geist, Geist_Mono } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HomePage = () => {
  return (
    <LandingPageLayout title="Ticket Portal">
      <Home />
    </LandingPageLayout>
  );
};

export default HomePage;
