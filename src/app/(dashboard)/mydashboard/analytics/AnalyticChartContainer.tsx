"use client";
import CustomChart, { ChartType } from "@/components/charts/CustomChart";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnalyticChartContainer = ({
  display,
  chartType = "BAR",
  chartData,
}: {
  chartData: ChartType;
  chartType?: "BAR" | "LINE";
  display?: boolean;
}) => {
  return (
    <AnimatePresence>
      {display && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="min-w-full max-w-full flex items-start justify-start grid-flow-col"
        >
          <CustomChart chartData={chartData} type={chartType} />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AnalyticChartContainer;
