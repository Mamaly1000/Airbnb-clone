import React, { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

const TextArea = ({
  value,
  onChange,
  disabled,
  placeholder,
  register,
}: {
  register?: any;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      {...register}
      onChange={onChange}
      disabled={disabled}
      className={twMerge(
        `hover:border-black focus:border-black dark:hover:border-rose-500 dark:focus:border-rose-500
         w-full p-4 pt-6 font-light border-2 rounded-md outline-none transition
          bg-white dark:bg-neutral-800
          text-black dark:text-white 
          disabled:opacity-70 disabled:cursor-not-allowed `
      )}
    />
  );
};

export default TextArea;
