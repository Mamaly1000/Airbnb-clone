"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { safeUserType } from "@/types/safeuser";
import useLoginModal from "@/hooks/useLoginModal";

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
}: {
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
  const router = useRouter();
  const loginModal = useLoginModal();
  const OnclickHandler = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!user) {
        loginModal.onOpen();
      }
      if (!disabled) {
        if (onClick) {
          onClick();
        } else if (route) {
          router.push(route);
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
        `relative peer p-1 md:px-3 md:py-2 rounded-lg hover:scale-100 hover:bg-opacity-70 cursor-pointer
         disabled:cursor-not-allowed disabled:opacity-50
         min-w-full max-w-full  
       hover:bg-black border-white text-neutral-700 dark:text-neutral-300 hover:text-white  dark:hover:text-white
         flex items-center justify-center md:justify-start gap-2`,
        isActive && `text-white dark:text-white bg-rose-500 font-bold`,
        disabled && `opacity-30`
      )}
      disabled={disabled}
      onClick={OnclickHandler}
    >
      <Icon size={size} />
      <p className="hidden md:block text-inherit">{label}</p>
      <AnimatePresence>
        {isActive && (
          <motion.hr
            className="min-w-[3px] border-none rounded-full drop-shadow-2xl  bg-white absolute z-10 end-0"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 20, opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SidebarItem;
