"use client";
import CustomChart, { ChartType } from "@/components/charts/CustomChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import useCharts from "@/hooks/useCharts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import Loader from "../ui/Loader";

const AnalyticChartContainer = () => {
  const { topic } = useAnalytics();
  const { isLoading, chartData } = useCharts({ topic });
  const Data: ChartType = useMemo(() => {
    if (topic === "LISTING_CATEGORY_COUNT") {
      return {};
    }
  }, [topic, chartData]);
  return (
    <AnimatePresence>
      {!isLoading ? (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="min-w-full max-w-full flex items-start justify-start grid-flow-col"
        >
          <CustomChart chartData={Data} type={"BAR"} />
        </motion.section>
      ) : (
        <Loader
          size={50}
          className="min-w-full max-w-full flex items-center justify-center col-span-full"
        />
      )}
    </AnimatePresence>
  );
};

export default AnalyticChartContainer;
