import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { twMerge } from "tailwind-merge";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import DashboardBottomBar from "@/components/bottom-bar/DashboardBottomBar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  return (
    <section
      className={twMerge(
        `col-span-12 relative min-w-full max-w-full grid grid-cols-12 items-start justify-center h-fit min-h-screen`
      )}
    >
      <Sidebar />
      <DashboardContent>
        <DashboardHeading />
        <section className="min-w-full max-w-full p-2 md:p-5 pb-[80px] md:pb-5">
          {children}
        </section>
      </DashboardContent>
      <DashboardBottomBar />
    </section>
  );
}
