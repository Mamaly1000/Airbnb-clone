"use client";
import fetcher from "@/libs/fetcher";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { safeListingType } from "@/types/safeListing";
import { listingSortType } from "@/components/search-page/SortSelect";
import { listingFilterType } from "@/components/search-page/FilterSelect";
import useSWRInfinite from "swr/infinite";
export type listingQueryHookType = {
  min?: number | undefined;
  max?: number | undefined;
  search?: string | undefined;
  category?: string | undefined;
  location?: string | undefined;
  sort?: listingSortType | undefined;
  filters?: listingFilterType | undefined;
};
const useListings = (params?: listingQueryHookType) => {
  const [pagination, setPagination] = useState<{
    hasMore: boolean;
    maxPages: number;
    total: number;
    page: number;
    nextPage: number;
  }>({
    hasMore: false,
    maxPages: 1,
    total: 0,
    page: 1,
    nextPage: 2,
  });
  const [maxPrice, setMaxPrice] = useState(1000);
  const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite<{
    listings: safeListingType[];
    pagination: typeof pagination;
    maxPrice: number;
  }>(
    (index) => {
      let query = qs.stringifyUrl({
        url: "/api/listings",
        query: {
          ...params,
          page: index + 1,
        },
      });
      return query;
    },
    fetcher,
    {
      errorRetryCount: 2,
      shouldRetryOnError: false,
    }
  );
  const onNextPage = useCallback(() => {
    if (pagination.hasMore && !isLoading && size <= pagination.maxPages) {
      setSize(pagination.nextPage);
    }
  }, [pagination, isLoading, size, setSize]);
  useEffect(() => {
    if (data?.[0]?.pagination) {
      const p = data ? data[data.length - 1].pagination : null;
      if (p) {
        setPagination({
          hasMore: p.hasMore,
          total: p.total,
          maxPages: p.maxPages,
          nextPage: p.nextPage,
          page: p.page,
        });
      }
    }
    if (data?.[0]?.maxPrice) {
      setMaxPrice(data ? data[data.length - 1].maxPrice : 1000);
    }
  }, [setPagination, data]);
  const notifications: safeListingType[] = data
    ? [].concat(...(data.map((page) => page.listings) as any))
    : [];
  return {
    isLoading,
    mutate,
    error,
    listings: (notifications || []) as safeListingType[],
    maxPrice: maxPrice,
    onNextPage,
    pagination,
  };
};
export default useListings;
