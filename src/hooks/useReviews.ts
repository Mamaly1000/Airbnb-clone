"use client";

import useSWR from "swr";
import qs from "query-string";
import fetcher from "@/libs/fetcher";
import { Feedback } from "@prisma/client";
export type ReviewQueryHookType = {};
const useReviews = (params?: ReviewQueryHookType) => {
  const query = qs.stringifyUrl({
    url: "/api/reviews",
    query: params,
  });
  const { data, isLoading, error, mutate } = useSWR(query, fetcher);
  return {
    reviews: (data?.reviews || []) as Feedback[],
    isLoading,
    mutate,
    error,
    pagination: data?.pagination as {
      maxPages: number;
      currentPage: number;
      nextPage: number;
      totalReviews: number;
      hasMore: boolean;
    },
  };
};

export default useReviews;
