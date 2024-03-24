"use client";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import React from "react";
import AnalyticsBody from "./AnalyticsBody";
import { useAnalytics } from "@/hooks/useAnalytics";

const AnalyticsPage = () => {
  const { topic } = useAnalytics();
  return (
    <section className="flex items-start justify-start flex-col min-w-full max-w-full">
      <AnalyticsHeader />
      <AnalyticsBody topic={topic} />
    </section>
  );
};

export default AnalyticsPage;
