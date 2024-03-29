import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import "react-tooltip/dist/react-tooltip.css";
import { twMerge } from "tailwind-merge";
import Body from "@/components/shared/CustomBody";
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
  return (
    <html lang="en">
      <Body className={twMerge(font.className)}>
        <ModalProvider />
        {children}
        <ToastProvider />
      </Body>
    </html>
  );
}
