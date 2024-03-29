import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export type DropDownItemType = {
  label?: string;
  Icon?: IconType;
  onClick?: () => void;
  disabled?: boolean;
};

const DropDown = ({
  options,
  children,
  className,
  position,
  display,
  onDropDown,
  onClose,
  isLoading,
  buttonClassName,
}: {
  onDropDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose?: () => void;
  display?: boolean;
  position?: string;
  options?: DropDownItemType[];
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  buttonClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "relative min-w-[35px] w-[35px] h-[35px] min-h-[35px] max-w-[35px] max-h-[35px] text-black dark:text-white",
        className
      )}
    >
      <button
        className={twMerge(
          `min-w-[35px]  w-[35px] h-[35px] min-h-[35px] max-w-[35px] max-h-[35px] 
          rounded-full p-1 flex items-center justify-center 
          hover:text-rose-500 hover:bg-rose-500 hover:bg-opacity-10  
          border-none outline-none focus-within:border-none focus:border-none`,
          buttonClassName
        )}
        onClick={onDropDown}
      >
        {children}
      </button>
      <AnimatePresence>
        {display && (
          <motion.section
            initial={{ opacity: 0, targetX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -20 }}
            onMouseLeave={onClose}
            onPointerLeave={onClose}
            className={twMerge(
              `absolute 
              flex flex-col items-start justify-start gap-1 
              border-[1px] border-neutral-300 dark:border-neutral-600  
              rounded-lg 
              drop-shadow-2xl 
              py-2 px-3 
              min-w-fit max-w-[90%] 
            bg-white dark:bg-neutral-900   
               `,
              position
            )}
          >
            {options?.map(({ disabled, Icon, label, onClick }, i) => (
              <motion.button
                disabled={disabled || isLoading}
                initial={{ opacity: 0, translateX: -5 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  ease: "linear",
                  duration: 0.13,
                  delay: i / 10 + 0.001,
                }}
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick!();
                }}
                className={`
                min-w-full max-w-full
                text-[15px] font-semibold capitalize whitespace-nowrap line-clamp-1
                flex items-center justify-start gap-2 px-3 py-2 rounded-full
              hover:bg-neutral-100 dark:hover:bg-neutral-950 
                disabled:opacity-50 disabled:cursor-not-allowed 
                   `}
              >
                {Icon && <Icon size={16} />}
                {label && label}
              </motion.button>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
