"use client";
import DashboardClientSection from "@/components/dashboard/DashboardClientSection";
import DashboardMapSection from "@/components/dashboard/DashboardMapSection";
import DashboardOverviewChartSection from "@/components/dashboard/DashboardOverviewChartSection";
import DashboardOverviewSection from "@/components/dashboard/DashboardOverviewSection";
import React from "react";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-12 gap-2 min-w-full max-w-full relative z-0  ">
      <DashboardOverviewSection />
      <DashboardOverviewChartSection />
      <DashboardClientSection />
      <DashboardMapSection />
    </section>
  );
};

export default DashboardPage;
