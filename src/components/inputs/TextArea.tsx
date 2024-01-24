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
        "hover:border-black focus:border-black peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed "
      )}
    />
  );
};

export default TextArea;
