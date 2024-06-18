import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import "react-tooltip/dist/react-tooltip.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "@/providers/ThemeProvider";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "wellcome to Airbnb",
};
const font = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge(font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModalProvider />
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
