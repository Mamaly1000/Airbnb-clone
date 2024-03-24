"use client";

import useSWR from "swr";
import { AnalyticsCategoryTypes } from "./useAnalytics";
import fetcher from "@/libs/fetcher";
import qs from "query-string";

const useOverView = (params: { category?: AnalyticsCategoryTypes }) => {
  const query = qs.stringifyUrl({
    url: "/api/overview",
    query: params,
  });
  const { data, error, isLoading, mutate } = useSWR(query, fetcher);
  return {
    overViews: (data || []) as {
      label: string;
      value: number;
      iconType: string;
    }[],
    error,
    isLoading,
    mutate,
  };
};

export default useOverView;
