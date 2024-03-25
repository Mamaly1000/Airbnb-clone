"use client";
import CustomChart, { ChartType } from "@/components/charts/CustomChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import useCharts from "@/hooks/useCharts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import Loader from "../ui/Loader";
import { twMerge } from "tailwind-merge";
import useCountry from "@/hooks/useCountry";

const AnalyticChartContainer = ({ className }: { className?: string }) => {
  const { topic } = useAnalytics();
  const { getByValue } = useCountry();
  const { isLoading, chartData } = useCharts({ topic });
  const Data: ChartType = useMemo(() => {
    if (chartData) {
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
          <CustomChart chartData={Data} type={"BAR"} />
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
