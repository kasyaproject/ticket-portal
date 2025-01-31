import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
        <PageHead />
        <Button isLoading color="primary">
          Loading
        </Button>
      </main>
    </div>
  );
}
