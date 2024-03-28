"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";
import { BiMenuAltRight } from "react-icons/bi";

const SidebarToggle = ({ className }: { className?: string }) => {
  const { isLoading, user } = useUser();
  const { onOpen: onOpenLoginModal } = useLoginModal();
  const {
    onOpen: onOpenDashboardSidebar,
    isOpen,
    onClose: onCloseSidebar,
  } = useDashboardSidebar();
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        if (user) {
          isOpen ? onCloseSidebar() : onOpenDashboardSidebar();
        } else {
          onOpenLoginModal();
        }
      }}
      disabled={isLoading}
      className={twMerge(
        "p-1 min-w-[40px] min-h-[40px]  flex items-center justify-center rounded-full border-[1px] border-neutral-200 dark:border-neutral-600 disabled:opacity-50 text-inherit bg-inherit relative",
        className
      )}
    >
      <BiMenuAltRight size={15} />
    </motion.button>
  );
};

export default SidebarToggle;
