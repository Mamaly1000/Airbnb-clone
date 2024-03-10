import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import "react-tooltip/dist/react-tooltip.css";
import { twMerge } from "tailwind-merge";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "wellcome to Airbnb",
};
const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={twMerge(font.className, "light")}>
        <ModalProvider />
        <Navbar user={user} />
        <div className="pb-32 pt-40">{children}</div>
        <ToastProvider />
      </body>
    </html>
  );
}
