import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";
import { addToast } from "@heroui/toast";

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
      <main className="flex items-center row-start-2 gap-8 sm:items-start">
        <PageHead />
        <Button
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              variant: "bordered",
              color: "success",
            })
          }
        >
          Success
        </Button>

        <Button
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              variant: "bordered",
              color: "secondary",
            })
          }
        >
          Secondary
        </Button>

        <Button
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              variant: "bordered",
              color: "warning",
            })
          }
        >
          Warning
        </Button>

        <Button
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              variant: "bordered",
              color: "danger",
            })
          }
        >
          Error
        </Button>
      </main>
    </div>
  );
}
