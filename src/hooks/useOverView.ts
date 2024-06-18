"use client";

import useSWR from "swr";
import { AnalyticsCategoryTypes } from "./useAnalytics";
import fetcher from "@/libs/fetcher";
import qs from "query-string";
import { OverviewType } from "@/types/OverviewType";

const useOverView = (params: { category?: AnalyticsCategoryTypes }) => {
  const query = qs.stringifyUrl({
    url: "/api/overview",
    query: params,
  });
  const { data, error, isLoading, mutate } = useSWR(query, fetcher, {
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return {
    overViews: (data || []) as OverviewType[],
    error,
    isLoading,
    mutate,
  };
};

export default useOverView;
