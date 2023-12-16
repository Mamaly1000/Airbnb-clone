"use client";

import { forwardRef } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface inputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
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
    },
    _ref
  ) => {
    return (
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="text-neutral-700 absolute top-5 start-2"
          />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          className={twMerge(
            " peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ",
            formatPrice ? "pl-9" : "pl-4",
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-neutral-300 focus:border-black"
          )}
          type={type}
        />
        <label
          htmlFor={id}
          className={twMerge(
            `capitalize  absolute text-base duration-150 -translate-y-3 top-5 z-10 origin-[0] 
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
export default Input;
