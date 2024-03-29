"use client";
import React, { forwardRef, MouseEvent } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
  className?: string;
  iconSize?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonInterface>(
  (
    {
      label,
      onClick,
      disabled,
      children,
      iconSize,
      outline,
      small,
      Icon,
      className,
    },
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        {...ref}
        className={twMerge(
          `relative font-bold capitalize disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full flex items-center justify-center gap-2`,
          outline
            ? "bg-white border-black text-black"
            : "text-white bg-rose-500 border-rose-500",
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-base font-semibold border-[2px] ",
          className
        )}
      >
        {Icon && <Icon className="absolute start-2 " size={iconSize || 30} />}
        {label || children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
