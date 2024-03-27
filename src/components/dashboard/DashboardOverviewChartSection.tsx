"use client";
import React, { useMemo } from "react";
import useCharts from "@/hooks/useCharts";
import {  sub } from "date-fns";
import CustomChart from "../charts/CustomChart";
import { motion } from "framer-motion";
import Loader from "../ui/Loader";
import { Range } from "react-date-range";
import { PiWarningCircleLight } from "react-icons/pi";

const initDate: Range = {
  startDate: sub(new Date(), { months: 3 }),
  endDate: new Date(),
  key: "selected",
};

const DashboardOverviewChartSection = () => {
  const {
    chartData: listingViewsChartData,
    isLoading: listingViewsChartDataIsloading,
  } = useCharts({
    startDate: initDate.startDate,
    endDate: initDate.endDate,
    topic: "LISTING_VIEWS_COUNT",
  });
  const {
    chartData: reservationRevenueChartData,
    isLoading: reservationRevenueChartDataIsloading,
  } = useCharts({
    startDate: initDate.startDate,
    endDate: initDate.endDate,
    topic: "RESERVATION_CREATED_COUNT",
  });
  const {
    chartData: feedbackTotalChartData,
    isLoading: feedbackTotalChartDataIsloading,
  } = useCharts({
    startDate: initDate.startDate,
    endDate: initDate.endDate,
    topic: "FEEDBACK_TOTAL_AVERAGE",
  });
  const articleCls =
    "bg-white dark:bg-neutral-900 min-h-[250px] flex flex-col justify-between items-center rounded-lg drop-shadow-2xl";
  const loadercls =
    "min-w-full max-w-full bg-white dark:bg-neutral-900 flex items-center bg-transparent justify-center max-h-full min-h-full h-full";
  const size = {
    height: "200px",
    width: "100%",
  };
  const listing = useMemo(() => {
    if (
      !listingViewsChartDataIsloading &&
      listingViewsChartData &&
      listingViewsChartData.type === "LISTING_VIEWS_COUNT"
    ) {
      return (
        <motion.article
          initial={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, ease: "linear", delay: 0.5 }}
          className={articleCls}
        >
          <div className="capitalize text-sm md:text-lg font-semibold text-left min-w-full p-3">
            recent properties views
          </div>
          {listingViewsChartData.data.length === 0 ? (
            <div className="min-w-full max-w-full p-3 flex gap-1 items-center justify-center min-h-[200px]">
              <PiWarningCircleLight size={20} />
              currently,there is no data
            </div>
          ) : (
            <CustomChart
              chartData={{
                data: listingViewsChartData.data,
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
                XAxisProps: { hide: true, dataKey: "label", fontSize: 14 },
                YAxisProps: {
                  hide: true,
                  dataKey: "value",
                  fontSize: 14,
                  type: "number",
                },
                legendProps: {
                  display: false,
                  formatter: () => listingViewsChartData.legend,
                },
                tooltip: {
                  formatter: (val) => [`${val} views`, "total view"],
                  labelFormatter: (label) => {
                    return `${label} views`;
                  },
                },
                size: {
                  height: "200px",
                  width: "100%",
                },
              }}
              type="BAR"
            />
          )}
        </motion.article>
      );
    } else {
      return (
        <article className={articleCls}>
          <Loader size={25} className={loadercls} />
        </article>
      );
    }
  }, [listingViewsChartDataIsloading, listingViewsChartData]);
  const reservation = useMemo(() => {
    if (
      !reservationRevenueChartDataIsloading &&
      reservationRevenueChartData &&
      reservationRevenueChartData.type === "RESERVATION_CREATED_COUNT"
    ) {
      return (
        <motion.article
          initial={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, ease: "linear", delay: 1 }}
          className={articleCls}
        >
          <div className="capitalize text-sm md:text-lg font-semibold text-left min-w-full p-3">
            recent reservations
          </div>
          {reservationRevenueChartData.data.length === 0 ? (
            <div className="min-w-full max-w-full p-3 flex gap-1 items-center justify-center min-h-[200px]">
              <PiWarningCircleLight size={20} />
              currently,there is no data
            </div>
          ) : (
            <CustomChart
              chartData={{
                data: reservationRevenueChartData.data.map((r) => ({
                  ...r,
                  createdAt: new Date(r.createdAt).getTime(),
                })),
                Lines: [
                  {
                    id: "reservations-total",
                    dataKey: "total",
                    yAxisId: "right",
                    stroke: "#0097e6",
                    type: "monotone",
                    legendTitle:
                      "total(notice that the timeframe is set to your selected time.)",
                    activeDot: false,
                    dot: false,
                    strokeWidth: 2,
                  },
                ],
                YAxisMap: [
                  {
                    width: 0,
                    hide: true,
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
                  padding: "gap",
                  hide: true,
                },
                tooltip: {
                  formatter: (val) => `${val} reservations`,
                },
                legendProps: {
                  display: false,
                },
                size,
              }}
              type="LINE"
            />
          )}
        </motion.article>
      );
    } else {
      return (
        <article className={articleCls}>
          <Loader size={25} className={loadercls} />
        </article>
      );
    }
  }, [reservationRevenueChartData, reservationRevenueChartDataIsloading]);
  const feedback = useMemo(() => {
    if (
      feedbackTotalChartData &&
      !feedbackTotalChartDataIsloading &&
      feedbackTotalChartData.type === "FEEDBACK_TOTAL_AVERAGE"
    ) {
      return (
        <motion.article
          initial={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, ease: "linear", delay: 1.5 }}
          className={articleCls}
        >
          <div className="capitalize text-sm md:text-lg font-semibold text-left min-w-full p-3">
            recent feedbacks
          </div>
          {feedbackTotalChartData.data.length === 0 ? (
            <div className="min-w-full max-w-full p-3 flex gap-1 items-center justify-center min-h-[200px]">
              <PiWarningCircleLight size={20} />
              currently,there is no data
            </div>
          ) : (
            <CustomChart
              chartData={{
                data: feedbackTotalChartData.data,
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
                  hide: true,
                },
                YAxisProps: {
                  fontSize: 14,
                  type: "number",
                  decimal: false,
                  domain: [0, 25],
                  hide: true,
                },
                tooltip: {
                  formatter: (val) => `${(+val).toFixed(2)} stars`,
                },
                size,
              }}
              type="BAR"
            />
          )}
        </motion.article>
      );
    } else {
      return (
        <article className={articleCls}>
          <Loader size={25} className={loadercls} />
        </article>
      );
    }
  }, [feedbackTotalChartData, feedbackTotalChartDataIsloading]);

  return (
    <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5 py-5 min-h-[250px]">
      {listing}
      {reservation}
      {feedback}
    </section>
  );
};

export default DashboardOverviewChartSection;
