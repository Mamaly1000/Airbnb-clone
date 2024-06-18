"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { sidebarItems } from "./Sidebar";
import useScrollAnimation from "@/hooks/useScroll";
import { AnimatePresence, motion } from "framer-motion";
import ToggleTheme from "../navbar/ToggleTheme";
import NotifToggle from "../navbar/NotifToggle";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";
import SidebarToggle from "../navbar/SidebarToggle";

const DashboardHeading = () => {
  const pathname = usePathname();
  const { isCollapse } = useDashboardSidebar();
  const { scrolled } = useScrollAnimation({});
  const hideDescription = useMemo(() => {
    return !!!(isCollapse || scrolled);
  }, [scrolled, isCollapse]);
  const heading = useMemo(() => {
    const query = qs.parseUrl(pathname!);
    return sidebarItems.find((item) => item.route.match(query.url));
  }, [pathname]);
  return (
    <motion.section
      className={twMerge(`
      min-w-full max-w-full p-3 md:p-5 z-10 bg-white dark:bg-neutral-800
      border-b-[1px] border-neutral-300 dark:border-neutral-600
      sticky top-0 left-0 flex flex-col items-start justify-start gap-2 transition-all
      shadow-md shadow-gray-200 dark:shadow-gray-900`)}
      transition={{ duration: 1 }}
    >
      <section className="min-w-full max-w-full flex items-center justify-between flex-wrap gap-2">
        <h1 className="capitalize font-bold text-black dark:text-white leading-3 text-left text-lg md:text-2xl ">
          {heading?.label}
        </h1>
        <div className="flex items-center justify-start md:justify-end gap-2">
          <NotifToggle
            className={twMerge(isCollapse ? "hidden" : "hidden md:flex")}
          />
          <ToggleTheme
            className={twMerge(isCollapse ? "hidden" : "hidden md:flex")}
          />
          <SidebarToggle className="" />
        </div>
      </section>
      <AnimatePresence>
        {hideDescription && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" text-[14px] md:text-[16px]  text-neutral-800 dark:text-neutral-300 capitalize font-light text-left min-w-full md:min-w-[50%] md:max-w-[50%] whitespace-pre-wrap"
          >
            {heading?.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DashboardHeading;
