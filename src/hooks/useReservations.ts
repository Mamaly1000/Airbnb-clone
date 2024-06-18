"use client";
import fetcher from "@/libs/fetcher";
import { safeReservationType } from "@/types/safeReservation";
import useSWR from "swr";
import qs from "query-string";
export type reservationStatusTypes =
  | "COMPLETED"
  | "PENDING"
  | "ALL"
  | "OUTDATED";
export type reservationQueryHookType = {
  page?: number;
  min?: number;
  max?: number;
  userId?: string;
  sortType?: "asc" | "desc";
  listingId?: string;
  type?: reservationStatusTypes;
  paginate?: boolean;
  startDate?: Date;
  endDate?: Date;
};
const useReservations = (params?: reservationQueryHookType) => {
  const query = qs.stringifyUrl({
    url: "/api/reservations",
    query: {
      ...params,
      startDate: params?.startDate ? params.startDate.toISOString() : undefined,
      endDate: params?.endDate ? params.endDate.toISOString() : undefined,
    },
  });
  const { data, error, isLoading, mutate } = useSWR(query, fetcher, {
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return {
    reservations: (data?.reservations || []) as safeReservationType[],
    error,
    isLoading,
    mutate,
    pagination: data?.pagination as {
      hasMore: boolean;
      totalPages: number;
      totalReservations: number;
      currentPage: number;
      nextPage: number;
    },
  };
};

export default useReservations;
