"use client"; 
import useScrollAnimation from "@/hooks/useScroll";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type T = {
  icon: IconType;
  label: string;
  value: any;
};

const OptionSelector = ({  
  onChange,
  options,
  label,
  Icon,
  position,
  disabled,
}: {
  disabled?: boolean;
  Icon?: IconType;
  options: T[];
  value?: T;
  onChange: (val: T) => void;
  label?: string;
  position?: string;
}) => {
  const [open, setOpen] = useState(false);
  const { isScrolling } = useScrollAnimation({});
  useEffect(() => {
    if (isScrolling) {
      setOpen(false);
    }
  }, [isScrolling]);
  return (
    <article className="relative z-50 flex items-center justify-center max-w-fit max-h-fit">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={twMerge(
          `px-3 rounded-[5px] drop-shadow-2xl 
          flex items-center justify-center gap-1 
          text-sm capitalize h-[40px] relative z-10
          border-[1px] border-black dark:border-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50`
        )}
        disabled={disabled}
      >
        {Icon && <Icon size={20} />} {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.15, ease: "linear" }}
            className={twMerge(
              `w-fit max-w-[300px]
               flex items-start justify-start flex-col gap-1 
               max-h-[400px] overflow-x-hidden overflow-y-auto
               absolute z-20 p-2 rounded-[5px]
               bg-white dark:bg-neutral-800
               border-neutral-300 dark:border-neutral-600 border-[1px]
                `,
              position ? position : "top-[110%] start-0"
            )}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {options.map(({ icon: Icon, label, value }, i) => (
              <motion.button
                initial={{ opacity: 0, translateX: -10 }}
                exit={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  duration: 0.2,
                  delay: i / 10 + 0.01,
                  ease: "linear",
                }}
                className={twMerge(
                  `max-w-fit md:min-w-full px-3 py-1 
                  md:whitespace-nowrap 
                  flex items-center justify-start gap-1 
                  text-neutral-600 dark:text-neutral-200 capitalize 
                  dark:hover:bg-neutral-600 hover:bg-neutral-300 
                  rounded-lg drop-shadow-2xl`
                )}
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({ icon: Icon, label, value });
                  setOpen(false);
                }}
              >
                <Icon size={20} /> {label}
              </motion.button>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </article>
  );
};

export default OptionSelector;
