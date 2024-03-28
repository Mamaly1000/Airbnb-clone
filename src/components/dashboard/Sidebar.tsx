"use client";
import React, { Fragment } from "react";
import { BsTags } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineManageSearch, MdOutlineSpaceDashboard } from "react-icons/md";
import { TbHomeSignal } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { VscFeedback } from "react-icons/vsc";
import {
  IoAnalytics,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import SmallUserprofile from "../shared/SmallUserprofile";
import useUser from "@/hooks/useUser";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { useTheme } from "@/hooks/useTheme";
import { LuMoonStar } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";

export const sidebarItems: {
  label: string;
  Icon: IconType;
  route: string;
  description: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}[] = [
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
const Sidebar = () => {
  const { user } = useUser();
  const { isCollapse, onExpand, onCollapse, isOpen } = useDashboardSidebar();
  const { mode, setTheme } = useTheme();
  const pathname = usePathname();
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
            Icon={mode === "dark" ? LuMoonStar : GoSun}
            label={mode === "dark" ? "Light Mode" : "Dark Mode"}
            mobileOnly={true}
            onClick={() => setTheme()}
            disabled={false}
          />{" "}
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
