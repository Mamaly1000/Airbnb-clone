"use client";

import { forwardRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface inputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onBlur?: (e: React.BaseSyntheticEvent) => void;
  min?: number;
  max?: number;
}
const Input = forwardRef<HTMLInputElement, inputProps>(
  (
    {
      id,
      label,
      type = "text",
      disabled,
      formatPrice,
      register,
      required,
      errors,
      onBlur,
      min,
      max,
    },
    _ref
  ) => {
    return (
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="text-gray-300 dark:text-neutral-400 absolute top-5 start-2"
          />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, min, max })}
          placeholder=" "
          className={twMerge(
            " peer w-full bg-white dark:bg-neutral-800 text-black dark:text-white p-4 pt-6 font-light border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ",
            formatPrice ? "pl-9" : "pl-4",
            errors[id]
              ? "border-red-500 focus:border-red-500"
              : "hover:border-rose-500 focus:border-rose-500"
          )}
          type={type}
          onBlur={onBlur}
          min={min}
          max={max}
        />
        <label
          htmlFor={id}
          className={twMerge(
            `capitalize text-gray-300 dark:text-neutral-400 absolute text-base duration-150 -translate-y-3 top-5 z-10 origin-[0] 
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-4`,
            formatPrice ? "left-9" : "left-4",
            errors[id] ? "text-rose-500" : "text-zinc-400"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
