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
import { useTheme } from "next-themes";

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
    margin,
  },
}: {
  chartData: ChartType;
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  return (
    <div
      style={{
        width: size?.width || "100%",
        height: size?.height || "400px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data} margin={margin}>
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
            hide={XAxisProps?.hide}
            padding={XAxisProps?.padding}
          />
          {YAxisMap ? (
            YAxisMap.map((y) => (
              <YAxis
                key={y?.dataKey}
                dataKey={y?.dataKey}
                width={y?.width || 20}
                fontSize={y?.fontSize || 20}
                tickFormatter={y?.formatter}
                type={y?.type}
                color={isDarkMode ? "#fff" : "#000"}
                fill={isDarkMode ? "#fff" : "#000"}
                tickLine={false}
                tickMargin={10}
                allowDecimals={y?.decimal}
                axisLine={false}
                domain={y?.domain}
                yAxisId={y?.yAxisId}
                orientation={y?.orientation}
                hide={y?.hide}
              />
            ))
          ) : (
            <YAxis
              dataKey={YAxisProps?.dataKey}
              width={YAxisProps?.width || 20}
              fontSize={YAxisProps?.fontSize || 20}
              tickFormatter={YAxisProps?.formatter}
              type={YAxisProps?.type}
              color={isDarkMode ? "#fff" : "#000"}
              fill={isDarkMode ? "#fff" : "#000"}
              tickLine={false}
              tickMargin={10}
              allowDecimals={YAxisProps?.decimal}
              axisLine={false}
              domain={YAxisProps?.domain}
              yAxisId={YAxisProps?.yAxisId}
              orientation={YAxisProps?.orientation}
              hide={YAxisProps?.hide}
            />
          )}
          <Tooltip
            cursor={false}
            contentStyle={{
              background: isDarkMode
                ? "rgba(0 0 0/.8)"
                : "rgba(255 255 255/.8)",
              borderColor: isDarkMode
                ? "rgba(137 133 133/.6)"
                : "rgba(137 133 133/.3)",
              borderRadius: 4,
              maxWidth: "200px",
              overflow: "hidden",
            }}
            itemStyle={{
              fontSize: "13px",
            }}
            formatter={tooltip?.formatter}
            labelFormatter={tooltip?.labelFormatter}
            labelClassName="line-clamp-1 max-w-full text-sm md:text-auto"
          />
          {legendProps?.display && (
            <Legend
              fill={
                isDarkMode ? legendProps?.fill?.dark : legendProps?.fill?.light
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
          )}
          {Lines &&
            Lines.map((l) => (
              <Line
                key={l.dataKey}
                yAxisId={l.yAxisId}
                type={l.type}
                dataKey={l.dataKey}
                stroke={l.stroke}
                activeDot={l.activeDot}
                dot={l.dot}
                strokeWidth={l.strokeWidth}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
