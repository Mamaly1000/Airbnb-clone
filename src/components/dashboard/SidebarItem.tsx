"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { safeUserType } from "@/types/safeuser";
import useLoginModal from "@/hooks/useLoginModal";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";

const SidebarItem = ({
  label,
  route,
  isActive,
  Icon,
  onClick,
  size = 15,
  index = 0,
  disabled,
  user,
  mobileOnly,
}: {
  mobileOnly?: boolean;
  user: safeUserType | null;
  disabled?: boolean;
  index?: number;
  size?: number;
  label: string;
  route?: string;
  isActive?: boolean;
  Icon: IconType;
  onClick?: () => void;
}) => {
  const { isCollapse, isOpen, onClose, onCollapse, onExpand, onOpen } =
    useDashboardSidebar();
  const router = useRouter();
  const loginModal = useLoginModal();
  const OnclickHandler = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!disabled) {
        if (!user) {
          loginModal.onOpen();
        } else {
          if (onClick) {
            onClick();
          } else if (route) {
            router.push(route);
          }
        }
      }
    },
    [route, disabled, onClick]
  );
  return (
    <motion.button
      initial={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.12, delay: index / 10 + 0.01 }}
      className={twMerge(
        `relative peer rounded-lg 
         disabled:cursor-not-allowed disabled:opacity-50
         hover:scale-100 hover:bg-opacity-70 cursor-pointer
          hover:bg-black border-white
         text-neutral-700 dark:text-neutral-300 hover:text-white
         dark:hover:text-white flex  gap-2`,
        isActive &&
          `text-white dark:text-white bg-black dark:bg-rose-500 font-bold`,
        mobileOnly && (isCollapse ? "flex" : "flex md:hidden"),
        isCollapse
          ? "items-center justify-center md:justify-start"
          : "items-center justify-start md:justify-start",
        isCollapse ? "w-fit" : " w-fit sm:min-w-full sm:max-w-full",
        "p-2 md:px-3 md:py-2"
      )}
      disabled={disabled}
      onClick={OnclickHandler}
    >
      <motion.div
        initial={{ rotate: 90 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
        key={Icon.toString()}
      >
        <Icon size={size} />
      </motion.div>
      <p
        className={twMerge(
          "text-inherit capitalize",
          isCollapse ? "hidden" : " block"
        )}
      >
        {label}
      </p>
      <AnimatePresence>
        {isActive && (
          <motion.hr
            className={twMerge(
              "min-w-[3px] border-none rounded-full bg-white absolute z-10 end-1 md:end-3 drop-shadow-2xl ",
              isCollapse ? "hidden " : "hidden md:block"
            )}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 25, opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SidebarItem;
