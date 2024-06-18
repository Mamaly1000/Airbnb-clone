"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoSun } from "react-icons/go";
import { LuMoonStar } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
const ToggleTheme = ({ className }: { className?: string }) => {
  
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const isLightMode = resolvedTheme === "light";
  const size = 15;

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        setTheme(isDarkMode ? "light" : "dark");
      }}
      className={twMerge(
        "p-2 min-w-[40px] min-h-[40px]  flex items-center justify-center rounded-full border-[1px] border-neutral-200 dark:border-neutral-600 text-inherit bg-inherit relative",
        className
      )}
    >
      <AnimatePresence>
        {isDarkMode && (
          <Icon>
            <LuMoonStar size={size} />
          </Icon>
        )}
      </AnimatePresence>{" "}
      <AnimatePresence>
        {isLightMode && (
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
