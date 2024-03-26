"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartType } from "./CustomChart";
import { useTheme } from "@/hooks/useTheme";
import { AxisDomain } from "recharts/types/util/types";

const CustomLineChart = ({
  chartData: {
    XAxisProps,
    YAxisProps,
    grid,
    legendProps,
    Lines,
    data,
    size,
    tooltip,
    YAxisMap,
  },
}: {
  chartData: ChartType;
}) => {
  const { mode } = useTheme();
  return (
    <div
      style={{
        width: size?.width || "100%",
        height: size?.height || "400px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {grid && (
            <CartesianGrid color="#898585" widths={2} strokeDasharray="3 3" />
          )}
          <XAxis
            dataKey={XAxisProps?.dataKey}
            width={XAxisProps?.width || 20}
            fontSize={XAxisProps?.fontSize || 20}
            tickFormatter={XAxisProps?.formatter}
            type={XAxisProps?.type}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          {YAxisMap ? (
            YAxisMap.map((y) => (
              <YAxis
                dataKey={y?.dataKey}
                width={y?.width || 20}
                fontSize={y?.fontSize || 20}
                tickFormatter={y?.formatter}
                type={y?.type}
                color={mode === "dark" ? "#fff" : "#000"}
                fill={mode === "dark" ? "#fff" : "#000"}
                tickLine={false}
                tickMargin={10}
                allowDecimals={y?.decimal}
                axisLine={false}
                domain={y?.domain}
                yAxisId={y?.yAxisId}
                orientation={y?.orientation}
              />
            ))
          ) : (
            <YAxis
              dataKey={YAxisProps?.dataKey}
              width={YAxisProps?.width || 20}
              fontSize={YAxisProps?.fontSize || 20}
              tickFormatter={YAxisProps?.formatter}
              type={YAxisProps?.type}
              color={mode === "dark" ? "#fff" : "#000"}
              fill={mode === "dark" ? "#fff" : "#000"}
              tickLine={false}
              tickMargin={10}
              allowDecimals={YAxisProps?.decimal}
              axisLine={false}
              domain={YAxisProps?.domain}
              yAxisId={YAxisProps?.yAxisId}
              orientation={YAxisProps?.orientation}
            />
          )}
          <Tooltip
            cursor={false}
            contentStyle={{
              background:
                mode === "dark" ? "rgba(0 0 0/.8)" : "rgba(255 255 255/.8)",
              borderColor:
                mode === "dark"
                  ? "rgba(137 133 133/.6)"
                  : "rgba(137 133 133/.3)",
              borderRadius: 4,
            }}
            formatter={tooltip?.formatter}
            labelFormatter={tooltip?.labelFormatter}
          />
          <Legend
            fill={
              mode === "dark"
                ? legendProps?.fill?.dark
                : legendProps?.fill?.light
            }
            width={legendProps?.width}
            height={legendProps?.height}
            align={legendProps?.align}
            layout={legendProps?.layout}
            iconSize={legendProps?.iconSize}
            iconType={legendProps?.iconType}
            margin={legendProps?.margin}
            verticalAlign={legendProps?.verticalAlign}
            formatter={legendProps?.formatter}
          />
          {Lines &&
            Lines.map((l) => (
              <Line
                yAxisId={l.yAxisId}
                type={l.type}
                dataKey={l.dataKey}
                stroke={l.stroke}
                activeDot={l.activeDot}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
