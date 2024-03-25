"use client";
import {
  BarChartLegendProps,
  BarChartSizePorp,
  BarChartXAxisProps,
  BarChartYAxisProps,
  BarDataItem,
} from "@/types/ChartTypes";
import React, { useMemo } from "react";
import CustomBarChart from "@/components/charts/BarChart";

import {
  Formatter,
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
export type ChartType = {
  data?: any[];
  grid?: boolean;
  YAxisProps?: BarChartYAxisProps;
  XAxisProps?: BarChartXAxisProps;
  size?: BarChartSizePorp;
  bars?: BarDataItem[];
  legendProps?: BarChartLegendProps;
  tooltip?: {
    formatter?: Formatter<ValueType, NameType>;
    labelFormatter?:
      | ((
          label: any,
          payload: Payload<ValueType, NameType>[]
        ) => React.ReactNode)
      | undefined;
  };
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
          tooltip={chartData.tooltip}
          grid={chartData.grid}
        />
      );
    }
  }, [type]);
  return content;
};

export default CustomChart;
