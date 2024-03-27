"use client";
import useOverView from "@/hooks/useOverView";
import React from "react";
import OverviewBox, { icontypes } from "../ui/OverviewBox";
import Loader from "../ui/Loader";

const DashboardOverviewSection = () => {
  const { overViews, isLoading } = useOverView({ category: "MAIN" });
  return (
    <section className="min-w-full max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 col-span-12 ">
      {!isLoading ? (
        overViews.map((r, i) => (
          <OverviewBox
            delay={i / 10 + 0.01}
            data={{
              icon: r.iconType as icontypes,
              label: r.label,
              value: r.value,
              isMoney: r.isMoney,
            }}
            progress={{
              minWidth: `${r?.percentage || 0}%`,
              percentage: r?.percentage || 0,
              color: r.color,
            }}
            style={{
              icon: {
                color: r.color,
                size: 30,
              },
            }}
            key={i}
          />
        ))
      ) : (
        <Loader size={20} className="col-span-12 max-h-[200px] h-[200px]" />
      )}
    </section>
  );
};

export default DashboardOverviewSection;
