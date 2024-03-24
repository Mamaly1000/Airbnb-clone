"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme"; 
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartType } from "./CustomChart";

const CustomBarChart = ({
  size,
  YAxisProps,
  XAxisProps,
  data,
  bars,
  legendProps,
}: ChartType) => {
  const { mode } = useTheme();
  return (
    <div
      style={{ width: size?.width || "100%", height: size?.height || "400px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <CartesianGrid strokeWidth={1} strokeDasharray="3 3" />
          <XAxis
            dataKey={XAxisProps?.dataKey}
            width={XAxisProps?.width || 20}
            fontSize={XAxisProps?.fontSize || 20}
            tickFormatter={XAxisProps?.formatter}
            type={XAxisProps?.type}
            color={XAxisProps?.color}
          />
          <YAxis
            dataKey={YAxisProps?.dataKey}
            width={YAxisProps?.width || 20}
            fontSize={YAxisProps?.fontSize || 20}
            tickFormatter={YAxisProps?.formatter}
            type={YAxisProps?.type}
            color={YAxisProps?.color}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              background:
                mode === "dark" ? "rgba(0 0 0/.6)" : "rgba(255 255 255/.6)",
              borderColor:
                mode === "dark"
                  ? "rgba(137 133 133/.6)"
                  : "rgba(137 133 133/.3)",
              borderRadius: 4,
            }}
          />
          {bars?.map((bar) => (
            <Bar
              key={bar.id}
              xlinkTitle="sdasdasasd"
              legendType={bar.legendType}
              dataKey={bar.dataKey}
              fill={mode === "dark" ? bar.fill?.dark : bar.fill?.light}
              activeBar={
                <Rectangle
                  fill={
                    mode === "dark"
                      ? bar.activeBar?.fill?.dark
                      : bar.activeBar?.fill?.light
                  }
                  stroke={bar.activeBar?.stroke}
                />
              }
              radius={bar.radius}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(CustomBarChart);
