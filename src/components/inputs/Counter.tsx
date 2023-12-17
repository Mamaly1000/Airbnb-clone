"use client";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({
  title,
  subTitle,
  value,
  onChange,
}: {
  title: string;
  subTitle?: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-start sm:justify-between">
      <div className="flex flex-col">
        <div className="font-medium capitalize">{title}</div>
        {subTitle && <div className="font-light text-gray-600">{subTitle}</div>}
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-red-500 font-bold px-2">{value}</div>
        <div
          onClick={onAdd}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
