"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const BarChartRating = ({
  data,
  className,
  label,
}: {
  label: string;
  className?: string;
  data: number[];
}) => {
  const allNumbers = data.length;
  const maxFive =
    (data.filter((n) => Math.round(n) === 5).length / allNumbers) * 100;
  const maxFour =
    (data.filter((n) => Math.round(n) === 4).length / allNumbers) * 100;
  const maxThree =
    (data.filter((n) => Math.round(n) === 3).length / allNumbers) * 100;
  const maxTwo =
    (data.filter((n) => Math.round(n) === 2).length / allNumbers) * 100;
  const maxOne =
    (data.filter((n) => Math.round(n) === 1 || Math.round(n) <= 1).length /
      allNumbers) *
    100;

  const ChartArray = [
    {
      label: "5",
      value: maxFive,
    },
    {
      label: "4",
      value: maxFour,
    },
    {
      label: "3",
      value: maxThree,
    },
    {
      label: "2",
      value: maxTwo,
    },
    {
      label: "1",
      value: maxOne,
    },
  ];

  return (
    <div
      className={twMerge(
        `w-[250px] min-h-[190px] max-w-[250px] max-h-[190px] h-fit text-sm p-3 rounded-lg 
         flex items-start justify-between gap-2 flex-col 
       bg-white dark:bg-neutral-900 text-black dark:text-white 
       `,
        className
      )}
    >
      {label && <p className="capitalize min-w-full text-left">{label}</p>}
      <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-2">
        {ChartArray.map((data) => (
          <div
            key={data.label}
            className="min-w-full max-w-full flex items-center justify-between gap-1"
          >
            <span className="text-neutral-500 dark:text-neutral-300">
              {data.label}
            </span>
            <motion.div className="relative flex items-center justify-start min-w-[200px] min-h-[6px] rounded-full bg-neutral-400 drop-shadow-2xl">
              <motion.div
                initial={{
                  minWidth: "1%",
                }}
                animate={{
                  minWidth: `${data.value}%`,
                }}
                className={twMerge("bg-black min-h-[6px]  dark:bg-rose-500")}
              ></motion.div>
            </motion.div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BarChartRating;
