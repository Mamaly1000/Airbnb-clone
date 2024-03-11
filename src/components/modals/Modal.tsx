"use client";
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { IoMdClose } from "react-icons/io";
import Button from "../inputs/Button";
import { AnimatePresence, motion } from "framer-motion";
const Modal = ({
  isOpen,
  onChange,
  header,
  body,
  footer,
  disable = false,
}: {
  disable?: boolean;
  header?: {
    title: string;
    close?: () => void;
    icon?: any;
  };
  body?: ReactNode | ReactElement;
  footer?: {
    primary?: {
      label: string;
      icon?: any;
      onClick: (e?: any) => void;
    };
    secondary?: {
      label?: string;
      icon?: any;
      onClick: () => void;
      type?: "form";
    };
    AdditionalActions?: ReactNode;
  };
  isOpen: boolean;
  onChange: (val: boolean) => void;
}) => {
  const [display, setDisplay] = useState(isOpen);
  useEffect(() => {
    setDisplay(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(
    (fn?: () => void) => {
      if (disable) {
        return;
      }
      setDisplay(false);
      setTimeout(() => {
        fn && fn();
        onChange(false);
      }, 300);
    },
    [disable, onChange]
  );
  const handleSubmit = useCallback(() => {
    if (disable || !footer || !footer.primary || !footer.primary.onClick) {
      return;
    }
    footer?.primary?.onClick();
  }, [disable, footer]);
  const handleSecondary = useCallback(() => {
    if (!footer || disable || !footer.secondary) {
      return;
    }

    footer.secondary.onClick();
  }, [disable, footer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-neutral-800/70 z-20">
          <div className="w-full flex items-center justify-center md:w-3/4 lg:w-3/6 xl:w-2/5 my-6 mx-auto absolute z-0">
            {/* content */}
            <div
              className={twMerge(
                `translate h-full min-h-screen max-h-screen overflow-hidden 
                md:min-h-[90vh] md:max-h-[90vh] border-0 rounded-lg 
                  shadow-lg relative flex flex-col w-full bg-white 
                  dark:bg-neutral-900 text-inherit outline-none focus:outline-none`,
                display
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              )}
            >
              {/* header */}
              <div className="flex items-center rounded-t justify-center relative border-b-[1px] py-4">
                <div className="w-auto text-black dark:text-[#e7e9ea] flex items-center justify-center gap-2 capitalize relative py-1 text-xl lg:text-2xl font-bold">
                  {header?.icon}
                  <span>{header?.title}</span>
                </div>
                <button
                  onClick={() => {
                    handleClose(footer?.secondary?.onClick);
                  }}
                  className="absolute start-4 top-2 rounded-full drop-shadow-2xl p-4 text-white bg-rose-500"
                >
                  <IoMdClose />
                </button>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto md:max-h-[80vh] overflow-auto ">
                {body}
              </div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6 capitalize">
                <div className="flex flex-row items-center gap-4 w-full capitalize">
                  {footer?.secondary && footer.secondary.label && (
                    <Button
                      label={footer?.secondary.label}
                      Icon={footer?.secondary?.icon}
                      onClick={() =>
                        footer.secondary?.type === "form"
                          ? handleSecondary()
                          : handleClose(handleSecondary)
                      }
                      disabled={disable}
                      outline
                    />
                  )}
                  {footer?.primary && (
                    <Button
                      label={footer?.primary.label}
                      Icon={footer?.primary?.icon}
                      onClick={handleSubmit}
                      disabled={disable}
                    />
                  )}
                </div>
                <div className="w-full flex items-start justify-start mt-2">
                  {footer?.AdditionalActions}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Modal;
