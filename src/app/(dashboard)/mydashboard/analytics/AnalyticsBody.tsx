"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FEEDBACK_TOPICS_TYPES,
  LISTING_TOPICS_TYPES,
  RESERVATION_TOPICS_TYPES,
} from "@/hooks/useAnalytics";
import { allTopics } from "@/components/Analytics/AnalyticsHeader";

const AnalyticsBody = ({
  topic,
}: {
  topic?:
    | LISTING_TOPICS_TYPES
    | RESERVATION_TOPICS_TYPES
    | FEEDBACK_TOPICS_TYPES;
}) => {
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
    <motion.section className="min-w-full max-w-full flex items-start justify-start flex-col gap-3">
      <h3 className="text-lg capitalize font-semibold min-w-full text-left text-black dark:text-white">
        {currentTopic?.label}
      </h3>
      <div className="min-w-full max-w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        
      </div>
    </motion.section>
  );
};

export default AnalyticsBody;
