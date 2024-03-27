"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Counter = ({
  endValue,
  className,
  decimals = 2,
  decimal = ".",
  suffix,
  delay,
  duration = 2,
  prefix,
}: {
  delay?: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  decimal?: string;
  className?: string;
  endValue: number;
  prefix?: string;
}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <motion.div
      className={twMerge(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {startAnimation && (
        <CountUp
          end={endValue}
          duration={duration}
          decimals={decimals}
          decimal={decimal}
          suffix={suffix}
          delay={delay}
          prefix={prefix}
        />
      )}
    </motion.div>
  );
};

export default Counter;
