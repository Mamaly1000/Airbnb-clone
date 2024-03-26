"use client";
import React from "react";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import AnalyticsBody from "@/components/Analytics/AnalyticsBody";
import { useAnalytics } from "@/hooks/useAnalytics";
import OverviewSection from "@/components/Analytics/shared/OverviewSection";
import FootNote from "@/components/shared/FootNote";

const AnalyticsPage = () => {
  const { topic } = useAnalytics();
  return (
    <section className="flex items-start justify-start flex-col min-w-full max-w-full">
      <OverviewSection />
      <AnalyticsHeader />
      <AnalyticsBody topic={topic} />
      <FootNote
        notes={[
          {
            note: "ba aware that if there is no data on the chart it might be for the timeFrame you selected.",
          },
          {
            note: "in further updates new options will be added to this page.",
            color: { dark: "#0D9276", light: "#337357" },
          },
        ]}
      />
    </section>
  );
};

export default AnalyticsPage;
