"use client";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { twMerge } from "tailwind-merge";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const loginModal = useLoginModal();
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
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
          `col-span-10 md:col-span-9 lg:col-span-10  
          min-h-screen w-full flex flex-col items-start justify-start gap-4
          bg-white dark:bg-neutral-800 text-black dark:text-white`
        )}
      >
        <DashboardHeading />
        <section className="min-w-full max-w-full p-2 md:p-5 ">
          {children}
        </section>
      </section>
    </section>
  );
}
