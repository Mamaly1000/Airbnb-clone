"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Counter = ({
  endValue,
  className,
}: {
  className?: string;
  endValue: number;
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
        <CountUp end={endValue} duration={2} decimals={2} decimal="." />
      )}
    </motion.div>
  );
};

export default Counter;
