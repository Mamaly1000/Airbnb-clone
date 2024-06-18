"use client";

import useSWR from "swr";
import qs from "query-string";
import fetcher from "@/libs/fetcher";
import { Feedback } from "@prisma/client";
import { ReviewFilterTypes, ReviewSortTypes } from "@/types/ReviewTypes";
export type ReviewQueryHookType = {
  page?: number;
  sortIn?: "desc" | "asc";
  sort?: ReviewSortTypes;
  search?: string;
  listing_name?: string;
  filterType?: ReviewFilterTypes;
  min?: number;
  max?: number;
  userId?: string;
  listingId?: string;
  paginate?: boolean;
  startDate?: Date;
  endDate?: Date;
};
const useReviews = (params?: ReviewQueryHookType) => {
  const query = qs.stringifyUrl({
    url: "/api/reviews",
    query: {
      ...params,
      startDate: params?.startDate?.toISOString(),
      endDate: params?.endDate?.toISOString(),
    },
  });
  const { data, isLoading, error, mutate } = useSWR(query, fetcher, {
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
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
