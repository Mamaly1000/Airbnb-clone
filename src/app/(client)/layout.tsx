import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";
import "react-tooltip/dist/react-tooltip.css";

import BottomBar from "@/components/bottom-bar/BottomBar";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "wellcome to Airbnb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="z-0  relative bg-white dark:bg-neutral-800 pb-[80px] md:pb-0 min-h-screen">
        {children}
      </main>
      <BottomBar />
    </>
  );
}
