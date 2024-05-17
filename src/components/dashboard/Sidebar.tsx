"use client";
import React, { Fragment } from "react";
import { BsTags } from "react-icons/bs";
import { FaAirbnb, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineManageSearch, MdOutlineSpaceDashboard } from "react-icons/md";
import { TbHomeSignal } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { VscFeedback } from "react-icons/vsc";
import {
  IoAnalytics,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import SmallUserprofile from "../shared/SmallUserprofile";
import useUser from "@/hooks/useUser";
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { useTheme } from "@/hooks/useTheme";
import { LuMoonStar } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { BiHome } from "react-icons/bi";
import useRentModal from "@/hooks/useRentModal";
import { AnimatePresence, motion } from "framer-motion";

export const sidebarItems: {
  label: string;
  pcOnly?: boolean;
  Icon: IconType;
  route: string;
  description: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}[] = [
  {
    label: "Home",
    Icon: BiHome,
    route: "/",
    description:
      "This menu item directs users to the main page that displays a summary of relevant information about their properties, reservations, and clients.",
    pcOnly: true,
  },
  {
    label: "Dashboard",
    Icon: MdOutlineSpaceDashboard,
    route: "/mydashboard",
    description:
      "This menu item directs users to the main page that displays a summary of relevant information about their properties, reservations, and clients.",
    pcOnly: true,
  },
  {
    label: "search",
    Icon: MdOutlineManageSearch,
    route: "/mydashboard/search",
    description:
      "The search page allows users to search for properties based on various filters, such as location, price, and amenities.",
    pcOnly: true,
  },
  {
    label: "properties",
    Icon: TbHomeSignal,
    route: "/mydashboard/properties",
    description:
      "The properties page displays a list of all the properties that the user has added to the system. Users can manage their properties, such as editing, adding, or removing them.",
  },
  {
    label: "reservations",
    Icon: BsTags,
    route: "/mydashboard/reservations",
    description:
      "The reservations page allows users to view and manage all reservations that have been made for their properties. Users can view upcoming reservations, cancel reservations, and update reservation details.",
  },
  {
    label: "explore",
    Icon: FaMapMarkerAlt,
    route: "/mydashboard/explore",
    description:
      " The explore page displays a map or a list of properties that are available for rent. Users can view property details, check availability, and make reservations.",
  },
  {
    label: "reviews",
    Icon: VscFeedback,
    route: "/mydashboard/reviews",
    description:
      "The reviews page displays all the reviews that have been left for the user's properties. Users can view and respond to reviews, as well as mark reviews as helpful or unhelpful.",
  },
  {
    label: "analytics",
    Icon: IoAnalytics,
    route: "/mydashboard/analytics",
    description:
      "The analytics page displays data about the user's properties and reservations. Users can view statistics on revenue, occupancy, and other metrics, as well as track their performance over time.",
    pcOnly: true,
  },
];
const Sidebar = () => {
  const router = useRouter();

  const { user } = useUser();
  const { isCollapse, onExpand, onCollapse, isOpen, onClose } =
    useDashboardSidebar();
  const { mode, setTheme } = useTheme();
  const pathname = usePathname();
  const { onOpen: openRentModal } = useRentModal();

  return (
    <>
      <section
        className={twMerge(
          `sticky top-0 left-0 
        min-h-screen max-h-screen overflow-y-auto overflow-x-hidden 
          flex-col items-start justify-start gap-2
        bg-white dark:bg-neutral-800 text-black dark:text-white border-r-[1px] border-neutral-300 dark:border-neutral-600`,
          isCollapse
            ? "sm:col-span-1 md:col-span-1 lg:col-span-1 p-2 md:p-2"
            : "sm:col-span-3 md:col-span-3 lg:col-span-2 p-2 md:p-5",
          isOpen ? "hidden sm:flex" : "hidden "
        )}
      >
        <SmallUserprofile user={user} />
        <section
          className={twMerge(
            "min-w-full max-w-full flex flex-col items-start gap-2 mt-3",
            isCollapse ? "justify-center items-center" : "justify-start"
          )}
        >
          {sidebarItems.map((item, i, arr) => (
            <Fragment key={i}>
              <SidebarItem
                user={user}
                index={i}
                size={25}
                isActive={
                  !!pathname?.match(item.route) && !!(pathname === item.route)
                }
                Icon={item.Icon}
                label={item.label}
                disabled={!!!user}
                route={item.route}
                mobileOnly={item.mobileOnly}
              />
              {i !== arr.length - 1 && (
                <hr
                  className={twMerge(
                    "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
                    isCollapse ? "block" : "block md:hidden"
                  )}
                />
              )}
            </Fragment>
          ))}
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={FaAirbnb}
            label={"Add new"}
            onClick={() => openRentModal()}
            disabled={!user}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={mode === "dark" ? LuMoonStar : GoSun}
            label={mode === "dark" ? "Light Mode" : "Dark Mode"}
            mobileOnly={true}
            onClick={() => setTheme()}
            disabled={false}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={AiOutlineLogout}
            label={"log out"}
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "/" });
            }}
            disabled={!user}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={
              isCollapse
                ? IoChevronForwardCircleOutline
                : IoChevronBackCircleOutline
            }
            label={isCollapse ? "expand" : "collapse"}
            onClick={() => {
              isCollapse ? onExpand() : onCollapse();
            }}
            disabled={false}
          />{" "}
        </section>
      </section>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onClose()}
            className="fixed sm:hidden top-0 left-0 w-full h-screen z-[49] bg-black/50"
          />
        )}
      </AnimatePresence>
      <section
        className={twMerge(
          `fixed sm:hidden top-0 left-0 z-[50]
           min-h-screen max-h-screen overflow-y-auto overflow-x-hidden 
           flex-col items-start justify-start gap-2
        bg-white dark:bg-neutral-800 text-black
         dark:text-white border-r-[1px] border-neutral-300
          dark:border-neutral-600 p-2`,
          isCollapse ? " min-w-[10%] " : "min-w-[30%]  ",
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-[-1000px] opacity-0"
        )}
      >
        <SmallUserprofile user={user} />
        <section
          className={twMerge(
            "min-w-full max-w-full flex flex-col items-start gap-2 mt-3",
            isCollapse ? "justify-center items-center" : "justify-start"
          )}
        >
          {sidebarItems.map((item, i, arr) => (
            <Fragment key={i}>
              <SidebarItem
                user={user}
                index={i}
                size={25}
                isActive={
                  !!pathname?.match(item.route) && !!(pathname === item.route)
                }
                Icon={item.Icon}
                label={item.label}
                disabled={!!!user}
                route={item.route}
                mobileOnly={item.mobileOnly}
                pcOnly={item.pcOnly}
                onClick={() => {
                  onClose();
                  router.push(item.route);
                }}
              />
              {i !== arr.length - 1 && (
                <hr
                  className={twMerge(
                    "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
                    item.pcOnly
                      ? "hidden md:block"
                      : isCollapse
                      ? "block"
                      : "block md:hidden"
                  )}
                />
              )}
            </Fragment>
          ))}
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              "hidden md:block"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={FaAirbnb}
            label={"Add new"}
            onClick={() => {
              onClose();
              openRentModal();
            }}
            disabled={!user}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={mode === "dark" ? LuMoonStar : GoSun}
            label={mode === "dark" ? "Light Mode" : "Dark Mode"}
            mobileOnly={true}
            onClick={() => setTheme()}
            disabled={false}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={AiOutlineLogout}
            label={"log out"}
            onClick={() => {
              onClose();
              signOut({ redirect: true, callbackUrl: "/" });
            }}
            disabled={!user}
          />
          <hr
            className={twMerge(
              "min-w-full max-w-full min-h-[2px] border-none bg-neutral-300 dark:bg-neutral-600 rounded-full",
              isCollapse ? "block" : "block md:hidden"
            )}
          />
          <SidebarItem
            user={user}
            index={5}
            size={25}
            Icon={
              isCollapse
                ? IoChevronForwardCircleOutline
                : IoChevronBackCircleOutline
            }
            label={isCollapse ? "expand" : "collapse"}
            onClick={() => {
              isCollapse ? onExpand() : onCollapse();
            }}
            disabled={false}
          />
        </section>
      </section>
    </>
  );
};

export default Sidebar;
