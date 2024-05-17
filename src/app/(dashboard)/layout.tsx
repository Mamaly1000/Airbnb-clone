"use client";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { twMerge } from "tailwind-merge";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import DashboardBottomBar from "@/components/bottom-bar/DashboardBottomBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const { isCollapse, isOpen } = useDashboardSidebar();
  const loginModal = useLoginModal();
  useEffect(() => {
    if (!user && !isLoading) {
      toast.error("please login to your account!");
      loginModal.onOpen();
    }
  }, [user, isLoading]);
  return (
    <section
      className={twMerge(
        `col-span-12 relative min-w-full max-w-full grid grid-cols-12 items-start justify-center h-fit min-h-screen`
      )}
    >
      <Sidebar />
      <section
        className={twMerge(
          `min-h-screen w-full min-w-full max-w-full flex flex-col items-start justify-start gap-4
          bg-white dark:bg-neutral-800 text-black dark:text-white`,
          isOpen
            ? isCollapse
              ? "col-span-12 sm:col-span-11 md:col-span-11 lg:col-span-11"
              : "col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-10"
            : "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12"
        )}
      >
        <DashboardHeading />
        <section className="min-w-full max-w-full p-2 md:p-5 pb-[80px] md:pb-5">
          {children}
        </section>
      </section>
      <DashboardBottomBar />
    </section>
  );
}
