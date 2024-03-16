"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { sidebarItems } from "./Sidebar";
import useScrollAnimation from "@/hooks/useScroll";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import ToggleTheme from "../navbar/ToggleTheme";
import { IoNotificationsOutline } from "react-icons/io5";
const DashboardHeading = () => {
  const pathname = usePathname();
  const [ref, { height }] = useMeasure();
  const { scrolled } = useScrollAnimation({});
  const heading = useMemo(() => {
    const query = qs.parseUrl(pathname!);
    return sidebarItems.find((item) => item.route.match(query.url));
  }, [pathname]);
  return (
    <motion.section
      animate={{ minHeight: scrolled ? 100 : height }}
      className={twMerge(`
     min-w-full max-w-full p-3 md:p-5 z-10 bg-white dark:bg-neutral-800
     border-b-[1px] border-neutral-300 dark:border-neutral-600
     sticky top-0 left-0 flex flex-col items-start justify-start gap-2 transition-all
        `)}
      ref={ref}
      transition={{ duration: 1 }}
    >
      <section className="min-w-full max-w-full flex items-center justify-between flex-wrap gap-2">
        <h1 className="capitalize font-bold text-black dark:text-white leading-3 text-left text-lg md:text-2xl ">
          {heading?.label}
        </h1>
        <div className="flex items-center justify-start md:justify-end gap-2">
          <ToggleTheme className="" />
          <button className="p-2 min-w-[40px] min-h-[40px]  flex items-center justify-center rounded-full border-[1px] border-neutral-200 text-inherit bg-inherit relative">
            <IoNotificationsOutline size={15} />
          </button>
        </div>
      </section>
      <AnimatePresence>
        {!scrolled && (
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
