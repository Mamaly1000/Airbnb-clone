"use client";
import CustomChart, { ChartType } from "@/components/charts/CustomChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import useCharts from "@/hooks/useCharts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import Loader from "../ui/Loader";
import { twMerge } from "tailwind-merge";
import useCountry from "@/hooks/useCountry";
import { format } from "date-fns";
function isDate(value: any): value is Date {
  const date = new Date(value);

  return (
    !isNaN(date.valueOf()) &&
    Object.prototype.toString.call(date) === "[object Date]"
  );
}
const AnalyticChartContainer = ({ className }: { className?: string }) => {
  const { topic, timeFrame, category } = useAnalytics();
  const { getByValue } = useCountry();
  const { isLoading, chartData } = useCharts({
    topic,
    startDate: timeFrame.startDate,
    endDate: timeFrame.endDate,
  });
  const type = useMemo(() => {
    if (category === "RESERVATION") {
      return "LINE";
    } else {
      return "BAR";
    }
  }, [category]);
  const Data: ChartType = useMemo(() => {
    if (chartData) {
      // properties chart data
      if (
        topic === "LISTING_CATEGORY_COUNT" &&
        chartData.type === "LISTING_CATEGORY_COUNT"
      ) {
        return {
          data: chartData.data.map((d) => ({ ...d, total: d.value })),
          bars: [
            {
              dataKey: "total",
              id: "listing-by-categories",
              legendTitle: "total properties",
              legendType: "diamond",
              fill: {
                dark: "#00b8d9",
                light: "#00b8d9",
              },
              activeBar: {
                fill: {
                  dark: "#7ec4e3",
                  light: "#7ec4e3",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
            type: "category",
          },
          YAxisProps: {
            dataKey: "total",
            fontSize: 14,
            type: "number",
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => {
              return val + " properties";
            },
          },
        } as ChartType;
      }
      if (
        topic === "LISTING_CATEGORY_PRICE" &&
        chartData.type === "LISTING_CATEGORY_PRICE"
      ) {
        return {
          data: chartData.data.map((d) => ({ ...d, average: d.value })),
          bars: [
            {
              dataKey: "average",
              id: "average-price-listing-by-categories",
              legendTitle: "average properties price",
              legendType: "star",
              fill: {
                dark: "#ff5249",
                light: "#ff5249",
              },
              activeBar: {
                fill: {
                  dark: "#fd7e77",
                  light: "#fd7e77",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
            type: "category",
          },
          YAxisProps: {
            dataKey: "average",
            fontSize: 14,
            type: "number",
            formatter: (val) => {
              return `$${val}`;
            },
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val, name) => `$${(+val).toFixed(2)}`,
          },
        };
      }
      if (
        topic === "LISTING_LOCATION_COUNT" &&
        chartData.type === "LISTING_LOCATION_COUNT"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "value",
              id: "total-listing-by-location",
              legendTitle: "total listings",
              legendType: "wye",
              fill: {
                dark: "#28b463",
                light: "#28b463",
              },
              activeBar: {
                fill: {
                  dark: "#169d4f",
                  light: "#169d4f",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
          },
          YAxisProps: {
            dataKey: "value",
            fontSize: 14,
            type: "number",
            decimal: false,
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => [`${val} properties`, "total"],
            labelFormatter: (label) => {
              const location = getByValue(label);
              return `${location?.label},${location?.region}`;
            },
          },
        };
      }
      if (
        topic === "LISTING_ENTITIES_COUNT" &&
        chartData.type === "LISTING_ENTITIES_COUNT"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "bathroomCount",
              id: "bathroomCount",
              legendTitle: "bathroomCount",
              legendType: "wye",
              fill: {
                dark: "#28b463",
                light: "#28b463",
              },
              activeBar: {
                fill: {
                  dark: "#169d4f",
                  light: "#169d4f",
                },
              },

              stackId: "a",
            },
            {
              dataKey: "roomCount",
              id: "roomCount",
              legendTitle: "roomCount",
              legendType: "circle",
              fill: {
                dark: "#00b8d9",
                light: "#00b8d9",
              },
              activeBar: {
                fill: {
                  dark: "#7ec4e3",
                  light: "#7ec4e3",
                },
              },

              stackId: "a",
            },
            {
              dataKey: "guestCount",
              id: "guestCount",
              legendTitle: "guestCount",
              legendType: "square",
              fill: {
                dark: "#ff5249",
                light: "#ff5249",
              },
              activeBar: {
                fill: {
                  dark: "#fd7e77",
                  light: "#fd7e77",
                },
              },

              stackId: "a",
            },
          ],
          XAxisProps: {
            dataKey: "title",
            fontSize: 14,
          },
          YAxisProps: {
            fontSize: 14,
            type: "number",
            decimal: false,
          },
        };
      }
      if (
        topic === "LISTING_RATE_AVERAGE" &&
        chartData.type === "LISTING_RATE_AVERAGE"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "value",
              id: "listing-average-rate",
              legendType: "star",
              fill: {
                dark: "#9e30b6",
                light: "#9e30b6",
              },
              activeBar: {
                fill: {
                  dark: "#8e24aa",
                  light: "#8e24aa",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
          },
          YAxisProps: {
            dataKey: "value",
            fontSize: 14,
            type: "number",
            domain: [0, 5],
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => [`${(+val).toFixed(2)} stars`, "rateing"],
            labelFormatter: (label) => {
              return `${label} rating`;
            },
          },
        };
      }
      if (
        topic === "LISTING_VIEWS_COUNT" &&
        chartData.type === "LISTING_VIEWS_COUNT"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "value",
              id: "listing views overview",
              legendType: "diamond",
              fill: {
                dark: "#449ad2",
                light: "#449ad2",
              },
              activeBar: {
                fill: {
                  dark: "#4fc1e3",
                  light: "#4fc1e3",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
          },
          YAxisProps: {
            dataKey: "value",
            fontSize: 14,
            type: "number",
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => [`${val} views`, "total view"],
            labelFormatter: (label) => {
              return `${label} views`;
            },
          },
        };
      }
      // feedback charts
      if (
        topic === "FEEDBACK_TOTAL_AVERAGE" &&
        chartData.type === "FEEDBACK_TOTAL_AVERAGE"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "cleanliness",
              id: "cleanliness",
              legendTitle: "cleanliness",
              legendType: "circle",
              fill: {
                dark: "#28b463",
                light: "#28b463",
              },
              activeBar: {
                fill: {
                  dark: "#169d4f",
                  light: "#169d4f",
                },
              },

              stackId: "a",
            },
            {
              dataKey: "accuracy",
              id: "accuracy",
              legendTitle: "accuracy",
              legendType: "cross",
              fill: {
                dark: "#00b8d9",
                light: "#00b8d9",
              },
              activeBar: {
                fill: {
                  dark: "#7ec4e3",
                  light: "#7ec4e3",
                },
              },
              stackId: "a",
            },
            {
              dataKey: "checkIn",
              id: "checkIn",
              legendTitle: "checkIn",
              legendType: "square",
              fill: {
                dark: "#ff5249",
                light: "#ff5249",
              },
              activeBar: {
                fill: {
                  dark: "#fd7e77",
                  light: "#fd7e77",
                },
              },

              stackId: "a",
            },
            {
              dataKey: "communication",
              id: "communication",
              legendTitle: "communication",
              legendType: "diamond",
              fill: {
                dark: "#ffb000",
                light: "#ffb000",
              },
              activeBar: {
                fill: {
                  dark: "#ffbd4a",
                  light: "#ffbd4a",
                },
              },

              stackId: "a",
            },
            {
              dataKey: "location",
              id: "location",
              legendTitle: "location",
              legendType: "plainline",
              fill: {
                dark: "#e91e63",
                light: "#e91e63",
              },
              activeBar: {
                fill: {
                  dark: "#c90036",
                  light: "#c90036",
                },
              },
              stackId: "a",
            },
          ],
          XAxisProps: {
            dataKey: "listing_name",
            fontSize: 14,
          },
          YAxisProps: {
            fontSize: 14,
            type: "number",
            decimal: false,
            domain: [0, 25],
          },
          tooltip: {
            formatter: (val) => `${(+val).toFixed(2)} stars`,
          },
        };
      }
      if (
        topic === "FEEDBACK_LISTING_COUNT" &&
        chartData.type === "FEEDBACK_LISTING_COUNT"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "value",
              id: "listing-total-rate",
              legendType: "star",
              fill: {
                dark: "#33691e",
                light: "#33691e",
              },
              activeBar: {
                fill: {
                  dark: "#284500",
                  light: "#284500",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
          },
          YAxisProps: {
            dataKey: "value",
            fontSize: 14,
            type: "number",
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => [`${val} reviews`, "total"],
            labelFormatter: (label) => {
              return `${label} reviews`;
            },
          },
        };
      }
      if (
        topic === "FEEDBACK_RATE_COUNT" &&
        chartData.type === "FEEDBACK_RATE_COUNT"
      ) {
        return {
          data: chartData.data,
          bars: [
            {
              dataKey: "value",
              id: "feedback-rate",
              legendType: "star",
              fill: {
                dark: "#0097e6",
                light: "#0097e6",
              },
              activeBar: {
                fill: {
                  dark: "#3771c9",
                  light: "#3771c9",
                },
              },
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 14,
          },
          YAxisProps: {
            dataKey: "value",
            fontSize: 14,
            type: "number",
            domain: [0, 5],
          },
          legendProps: {
            formatter: () => chartData.legend,
          },
          tooltip: {
            formatter: (val) => [`${val} ratings`, "total"],
            labelFormatter: (label) => {
              return `${label} rating`;
            },
          },
        };
      }
      // reservations charts data
      if (
        topic === "RESERVATION_CREATED_COUNT" &&
        chartData.type === "RESERVATION_CREATED_COUNT"
      ) {
        return {
          data: chartData.data.map((r) => ({
            ...r,
            createdAt: new Date(r.createdAt).getTime(),
          })),
          Lines: [
            {
              activeDot: { r: 10 },
              id: "reservations-createdAt",
              dataKey: "createdAt",
              yAxisId: "left",
              stroke: "#4fc1e3",
              type: "bump",
              legendTitle:
                "createdAt(notice that the timeframe is set to your selected time.)",
            },
            {
              activeDot: { r: 10 },
              id: "reservations-total",
              dataKey: "total",
              yAxisId: "right",
              stroke: "#0097e6",
              type: "monotone",
              legendTitle:
                "total(notice that the timeframe is set to your selected time.)",
            },
          ],
          YAxisMap: [
            {
              dataKey: "createdAt",
              yAxisId: "left",
              formatter: (val) => {
                return format(new Date(val), "yy/MM/dd");
              },
              fontSize: 12,
              type: "category",
            },
            {
              dataKey: "total",
              yAxisId: "right",
              orientation: "right",
              type: "number",
              fontSize: 12,
            },
          ],
          XAxisProps: {
            dataKey: "title",
            fontSize: 12,
          },
          tooltip: {
            formatter: (val, _name, _item, index) => {
              if (index === 0) {
                return format(new Date(val as any), "yyyy/MMMM/dd-hh:mm a");
              }
              if (index === 1) {
                return `${val} reservations`;
              }
            },
          },
        };
      }
      if (
        topic === "RESERVATION_DATE_TOTALPRICE" &&
        chartData.type === "RESERVATION_DATE_TOTALPRICE"
      ) {
        return {
          data: chartData.data.map((r) => ({
            ...r,
            endDate: new Date(r.endDate).getTime(),
          })),
          Lines: [
            {
              activeDot: { r: 10 },
              id: "reservations-endDate",
              dataKey: "endDate",
              yAxisId: "left",
              stroke: "#28b463",
              type: "bump",
              legendTitle:
                "createdAt(notice that the timeframe is set to your selected time.)",
            },
            {
              activeDot: { r: 10 },
              id: "reservations-totalPrice",
              dataKey: "totalPrice",
              yAxisId: "right",
              stroke: "#fd7e77",
              type: "monotone",
              legendTitle:
                "totalPrice(notice that the timeframe is set to your selected time.)",
            },
          ],
          YAxisMap: [
            {
              dataKey: "endDate",
              yAxisId: "left",
              formatter: (val) => {
                return format(new Date(val), "yy/MM/dd");
              },
              fontSize: 12,
              type: "category",
              width: 50,
            },
            {
              dataKey: "totalPrice",
              yAxisId: "right",
              orientation: "right",
              fontSize: 12,
              width: 50,
              formatter: (val) => `$${(+val).toFixed(2)}`,
            },
          ],
          XAxisProps: {
            dataKey: "title",
            fontSize: 12,
          },
          tooltip: {
            formatter: (val, _m, _n, i) => {
              if (i === 0) {
                return format(new Date(val as any), "yyyy/MMMM/dd-hh:mm a");
              }
              if (i === 1) {
                return `$${(+val).toFixed(2)}`;
              }
            },
          },
        };
      }
      if (
        topic === "RESERVATION_REVENUE_COUNT" &&
        chartData.type === "RESERVATION_REVENUE_COUNT"
      ) {
        return {
          data: chartData.data.map((r) => ({
            ...r,
            createdAt: new Date(r.createdAt!).getTime(),
          })),
          Lines: [
            {
              activeDot: { r: 10 },
              id: "reservations-createdAt",
              dataKey: "createdAt",
              yAxisId: "left",
              stroke: "#33691e",
              type: "bump",
              legendTitle:
                "createdAt(notice that the timeframe is set to your selected time.)",
            },
            {
              activeDot: { r: 10 },
              id: "reservations-average",
              dataKey: "average",
              yAxisId: "right",
              stroke: "#8e24aa",
              type: "monotone",
              legendTitle:
                "average(notice that the timeframe is set to your selected time.)",
            },
          ],
          YAxisMap: [
            {
              dataKey: "createdAt",
              yAxisId: "left",
              formatter: (val) => {
                return format(new Date(val), "yy/MM/dd");
              },
              fontSize: 12,
              type: "category",
              width: 50,
            },
            {
              dataKey: "average",
              yAxisId: "right",
              orientation: "right",
              fontSize: 12,
              width: 50,
              formatter: (val) => `$${(+val).toFixed(2)}`,
            },
          ],
          XAxisProps: {
            dataKey: "title",
            fontSize: 12,
          },
          tooltip: {
            formatter: (val, _m, _n, i) => {
              if (i === 0) {
                return format(new Date(val as any), "yyyy/MMMM/dd-hh:mm a");
              }
              if (i === 1) {
                return `$${(+val).toFixed(2)}`;
              }
            },
          },
        };
      }
      if (
        topic === "RESERVATION_STATUS" &&
        chartData.type === "RESERVATION_STATUS"
      ) {
        return {
          data: chartData.data,
          Lines: [
            {
              activeDot: { r: 10 },
              id: "reservations-totalPrice",
              dataKey: "totalPrice",
              yAxisId: "left",
              stroke: "#0097e6",
              type: "bump",
              legendTitle:
                "totalPrice(notice that the timeframe is set to your selected time.)",
            },
            {
              activeDot: { r: 10 },
              id: "reservations-status",
              dataKey: "status",
              yAxisId: "right",
              stroke: "#ff5249",
              type: "step",
              legendTitle:
                "status(notice that the timeframe is set to your selected time.)",
            },
          ],
          YAxisMap: [
            {
              dataKey: "totalPrice",
              yAxisId: "left",
              formatter: (val) => {
                return format(new Date(val), "yy/MM/dd");
              },
              fontSize: 12,
              type: "number",
              width: 50,
            },
            {
              dataKey: "status",
              yAxisId: "right",
              orientation: "right",
              fontSize: 12,
              width: 50,
            },
          ],
          XAxisProps: {
            dataKey: "title",
            fontSize: 12,
          },
          tooltip: {
            formatter: (val, _m, _n, i) => {
              if (i === 0) {
                return `$${(+val).toFixed(2)}`;
              }
              if (i === 1) {
                return val;
              }
            },
          },
        };
      }
      if (
        topic === "RESERVATION_USER_COUNT" &&
        chartData.type === "RESERVATION_USER_COUNT"
      ) {
        return {
          data: chartData.data,
          Lines: [
            {
              activeDot: { r: 10 },
              id: "reservations-totalReservations",
              dataKey: "totalReservations",
              yAxisId: "left",
              stroke: "#7ec4e3",
              type: "monotone",
              legendTitle:
                "totalReservations(notice that the timeframe is set to your selected time.)",
            },
          ],
          YAxisMap: [
            {
              dataKey: "totalReservations",
              fontSize: 12,
              type: "number",
              width: 50,
              yAxisId: "left",
              decimal: true,
            },
          ],
          XAxisProps: {
            dataKey: "label",
            fontSize: 12,
          },
          tooltip: {
            formatter: (val) => {
              return `${val} reservations`;
            },
          },
        };
      }
    }
    return {} as ChartType;
  }, [topic, chartData]);
  return (
    <AnimatePresence>
      {!isLoading ? (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className={twMerge(
            "min-w-full max-w-full flex items-start justify-start col-span-full",
            className
          )}
          key={topic}
        >
          <CustomChart chartData={Data} type={type} />
        </motion.section>
      ) : (
        <Loader
          size={50}
          className="min-w-full max-w-full flex items-center justify-center col-span-full"
        />
      )}
    </AnimatePresence>
  );
};

export default AnalyticChartContainer;
const colorList = [
  ["Electric Blue", "#00b8d9", "#7ec4e3"],
  ["Coral Orange", "#fd7e77", "#ff5249"],
  ["Cool Green", "#28b463", "#169d4f"],
  ["Candy Purple", "#8e24aa", "#9e30b6"],
  ["Sky Blue", "#4fc1e3", "#449ad2"],
  ["Vibrant Yellow", "#ffbd4a", "#ffb000"],
  ["Bright Red", "#f44336", "#e81116"],
  ["Chill Blue", "#0097e6", "#3771c9"],
  ["Deep Pink", "#e91e63", "#c90036"],
  ["Bold Green", "#33691e", "#284500"],
];
