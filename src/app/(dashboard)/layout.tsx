import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { twMerge } from "tailwind-merge";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export const metadata: Metadata = {
  title: "Airbnb dashboard",
  description: "wellcome to Airbnb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={twMerge(
        `col-span-12 relative min-w-full max-w-full grid grid-cols-12 items-start justify-center h-fit min-h-screen`
      )}
    >
      <Sidebar />
      <section
        className={twMerge(
          `col-span-10 md:col-span-9 lg:col-span-10  
          min-h-screen w-full flex flex-col items-start justify-start gap-4
          bg-white dark:bg-neutral-800 text-black dark:text-white`
        )}
      >
        <DashboardHeading />
        <section className="min-w-full max-w-full p-5">{children}</section>
      </section>
    </section>
  );
}
