"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
interface headingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading = ({ title, center, subtitle }: headingProps) => {
  return (
    <div className={twMerge(center ? "text-center" : "text-start")}>
      <div className="text-2xl font-bold capitalize">{title}</div>
      <div className="font-light text-neutral-500 mt-2 capitalize">{subtitle}</div>
    </div>
  );
};

export default Heading;
