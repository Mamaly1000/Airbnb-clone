"use client";
import React from "react";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import AnalyticsBody from "@/components/Analytics/AnalyticsBody";
import { useAnalytics } from "@/hooks/useAnalytics";
import OverviewSection from "@/components/Analytics/shared/OverviewSection";

const AnalyticsPage = () => {
  const { topic } = useAnalytics();
  return (
    <section className="flex items-start justify-start flex-col min-w-full max-w-full">
      <OverviewSection />
      <AnalyticsHeader />
      <AnalyticsBody topic={topic} />
    </section>
  );
};

export default AnalyticsPage;
