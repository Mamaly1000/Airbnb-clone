"use client";
import fetcher from "@/libs/fetcher";
import { useState } from "react";
import useSWR from "swr";
import qs from "query-string";
import { safeListingType } from "@/types/safeListing";
import { listingSortType } from "@/components/search-page/SortSelect";
import { listingFilterType } from "@/components/search-page/FilterSelect";

const useListings = () => {
  const [params, setParams] = useState<{
    min?: number;
    max?: number;
    search?: string;
    category?: string;
    location?: string;
    sort?: listingSortType;
    filters?: listingFilterType;
  }>({});
  const query = qs.stringifyUrl({
    url: "/api/listings",
    query: params,
  });

  const { data, isLoading, mutate, error } = useSWR(query, fetcher);
  return {
    setParams,
    isLoading,
    mutate,
    error,
    listings: (data?.listings || []) as safeListingType[],
    maxPrice: data?.maxPrice || 1000,
  };
};
export default useListings;
