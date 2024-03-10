"use client";
import { useTheme } from "@/hooks/useTheme";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoSun } from "react-icons/go";
import { LuMoonStar } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
const ToggleTheme = ({ className }: { className?: string }) => {
  const { mode, setTheme } = useTheme();
  const size = 15;
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        setTheme();
      }}
      className={twMerge(
        "p-2 min-w-[40px] min-h-[40px]  flex items-center justify-center rounded-full border-[1px] border-neutral-200 text-inherit bg-inherit relative",
        className
      )}
    >
      <AnimatePresence>
        {mode === "dark" && (
          <Icon>
            <LuMoonStar size={size} />
          </Icon>
        )}
      </AnimatePresence>{" "}
      <AnimatePresence>
        {mode === "light" && (
          <Icon>
            <GoSun size={size} />
          </Icon>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ToggleTheme;

export const Icon = ({ children }: { children: ReactNode }) => (
  <motion.span
    initial={{ rotate: 130, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: -130, opacity: 0 }}
    transition={{ duration: 0.12, ease: "circInOut" }}
    className="absolute"
  >
    {children}
  </motion.span>
);
