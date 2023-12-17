import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import 'react-tooltip/dist/react-tooltip.css'
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
      <body className={font.className}>
        <ModalProvider />
        <Navbar user={user} />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
