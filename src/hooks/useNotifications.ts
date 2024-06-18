"use client";
import fetcher from "@/libs/fetcher";
import { SafeNotificationType } from "@/types/safeNotificationType";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
export type NotificationSortTypes =
  | "NEWEST"
  | "OLDEST"
  | "TOP AMOUNT"
  | "LOW AMOUNT";
export type NotificationFilterTypes =
  | "SEEN"
  | "UNSEEN"
  | "REVIEW"
  | "BOOKING"
  | "REBOOKING"
  | "UPDATING"
  | "CANCELING"
  | "LIKING"
  | "DISLIKING"
  | "COMPLETED-RESERVATIONS";
export type notificationQueryParams = {
  sort?: NotificationSortTypes;
  filter?: NotificationFilterTypes;
  search?: string;
};
const useNotifications = (params?: notificationQueryParams) => {
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
  const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite<{
    notifications: SafeNotificationType[];
    pagination: typeof pagination;
  }>(
    (index) => {
      let query = qs.stringifyUrl({
        url: "/api/notifications",
        query: {
          search: params?.search,
          sort: params?.sort,
          filter: params?.filter,
          page: index + 1,
        },
      });
      return query;
    },
    fetcher,
    {
      errorRetryCount: 1,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
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
  }, [setPagination, data]);

  const notifications: SafeNotificationType[] = data
    ? [].concat(...(data.map((page) => page.notifications) as any))
    : [];
  return {
    notifications: (notifications || []) as SafeNotificationType[],
    error,
    isLoading,
    mutate,
    pagination,
    onNextPage,
  };
};

export default useNotifications;
