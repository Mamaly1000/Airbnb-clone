"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";
import useScrollAnimation from "@/hooks/useScroll";
import { twMerge } from "tailwind-merge";
import { BiHome } from "react-icons/bi";
import { MdOutlineManageSearch, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoAnalytics, IoNotificationsOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";

const DashboardBottomBar = () => {
  const { user } = useUser();

  const loginModal = useLoginModal();

  const router = useRouter();
  const pathname = usePathname();

  const { isOpen } = useDashboardSidebar();
  const { isScrolling, scrolled } = useScrollAnimation({});

  const items = [
    {
      label: "Home",
      Icon: BiHome,
      route: "/",
      description:
        "This menu item directs users to the main page that displays a summary of relevant information about their properties, reservations, and clients.",
    },
    {
      label: "Dashboard",
      Icon: MdOutlineSpaceDashboard,
      route: "/mydashboard",
      description:
        "This menu item directs users to the main page that displays a summary of relevant information about their properties, reservations, and clients.",
    },
    {
      label: "search",
      Icon: MdOutlineManageSearch,
      route: "/mydashboard/search",
      description:
        "The search page allows users to search for properties based on various filters, such as location, price, and amenities.",
    },
    {
      label: "analytics",
      Icon: IoAnalytics,
      route: "/mydashboard/analytics",
      description:
        "The analytics page displays data about the user's properties and reservations. Users can view statistics on revenue, occupancy, and other metrics, as well as track their performance over time.",
    },
    {
      label: "notifications",
      Icon: IoNotificationsOutline,
      route: "/mydashboard/notifications",
      description:
        "The notifications page displays your notifications which generally are about booking,rebooking,canceling,updating,like,dislike and reviews.",
      mobileOnly: true,
    },
  ];

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          className={twMerge(
            `md:hidden flex items-center justify-between gap-2 px-3
             min-w-full fixed bottom-0 left-0 right-0 
             border-t-[1px] border-neutral-300 dark:border-neutral-600 
             min-h-[70px] max-h-[70px]
             bg-white dark:bg-neutral-800
             text-[#5B5B5B] dark:text-white`
          )}
          animate={{ opacity: isScrolling && scrolled ? 0.5 : 1 }}
          exit={{ opacity: 0 }}
        >
          {items.map((i) => (
            <button
              key={i.label}
              className={twMerge(
                `flex items-center relative justify-center gap-1 flex-col font-light text-sm hover:text-rose-500`,
                pathname === i.route && "text-rose-500 font-bold"
              )}
              onClick={() =>
                user ? router.push(i.route) : loginModal.onOpen()
              }
            >
              <i.Icon size={25} />
              <span className="hidden sm:block">{i.label}</span>
              {user && user?.hasNotification && i.label.includes("notif") && (
                <div className="absolute top-[-1px] right-[-1px] rounded-full min-w-[10px] min-h-[10px] bg-rose-500 drop-shadow-2xl" />
              )}
            </button>
          ))}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default DashboardBottomBar;
