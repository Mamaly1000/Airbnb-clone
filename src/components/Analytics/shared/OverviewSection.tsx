"use client";
import Loader from "@/components/ui/Loader";
import { useAnalytics } from "@/hooks/useAnalytics";
import useOverView from "@/hooks/useOverView";
import React from "react";
import OverviewBox from "./OverviewBox"; 

const OverviewSection = () => {
  const { category } = useAnalytics();
  const { overViews, isLoading } = useOverView({ category });
  return (
    <div
      key={category}
      className="min-w-full max-w-full grid grid-cols-1 md:grid-cols-3 gap-3 py-5"
    >
      {isLoading ? (
        <Loader
          size={20}
          className="min-w-full max-w-full min-h-[300px] h-[300px] flex items-center justify-center col-span-full"
        />
      ) : (
        overViews.map((o, i) => (
          <OverviewBox
            delay={i / 10 + 0.01}
            key={i}
            style={{
              icon: {
                size: "30px",
              },
            }}
            data={{ icon: o.iconType as any, label: o.label, value: o.value }}
          />
        ))
      )}
    </div>
  );
};

export default OverviewSection;
