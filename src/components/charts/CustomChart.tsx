"use client";
import {
  BarChartLegendProps,
  BarChartSizePorp,
  BarChartXAxisProps,
  BarChartYAxisProps,
  BarDataItem,
} from "@/types/BarChartTypes";
import React, { useMemo } from "react";
import CustomBarChart from "@/components/charts/BarChart";
export type ChartType = {
  data?: any[];
  YAxisProps?: BarChartYAxisProps;
  XAxisProps?: BarChartXAxisProps;
  size?: BarChartSizePorp;
  bars?: BarDataItem[];
  legendProps?: BarChartLegendProps;
};
const CustomChart = ({
  type,
  chartData,
}: {
  chartData: ChartType;
  type: "BAR" | "LINE";
}) => {
  const content = useMemo(() => {
    if (type === "BAR") {
      return (
        <CustomBarChart
          XAxisProps={chartData.XAxisProps}
          YAxisProps={chartData.YAxisProps}
          bars={chartData.bars}
          data={chartData.data}
          legendProps={chartData.legendProps}
          size={chartData.size}
        />
      );
    }
  }, [type]);
  return content;
};

export default CustomChart;
