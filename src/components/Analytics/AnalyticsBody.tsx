"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { SingleAnalyticType } from "@/hooks/useAnalytics";
import { allTopics } from "@/components/Analytics/AnalyticsHeader"; 
import AnalyticChartContainer from "./AnalyticChartContainer";

const AnalyticsBody = ({ topic }: { topic?: SingleAnalyticType }) => {
  const currentTopic = useMemo(() => {
    if (!topic) {
      return null;
    }
    return allTopics
      .map((i) => i.topics)
      .flat()
      .find((i) => i.value === topic);
  }, [topic]);
  return (
    <motion.section className="min-w-full max-w-full flex items-start justify-start flex-col gap-8 py-5">
      <h3 className="text-lg md:text-[30px] capitalize font-semibold min-w-full text-left text-black dark:text-white">
        {currentTopic?.label}
      </h3>
      <AnalyticChartContainer className="pt-5" />
    </motion.section>
  );
};

export default AnalyticsBody;
