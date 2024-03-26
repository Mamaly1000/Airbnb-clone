"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import { SingleAnalyticType } from "./useAnalytics";
import qs from "query-string";
import { ChartValueType } from "@/types/ChartTypes"; 

const useCharts = (params?: {
  topic?: SingleAnalyticType;
  endDate?: Date;
  startDate?: Date;
}) => {
  const query = qs.stringifyUrl({
    url: "/api/charts",
    query: {
      ...params,
      startDate: params?.startDate?.toISOString(),
      endDate: params?.endDate?.toISOString(),
    },
  });
  const { data, error, isLoading, mutate } = useSWR(query, fetcher);
  return {
    chartData: (data || null) as ChartValueType,
    error,
    isLoading,
    mutate,
  };
};

export default useCharts;
