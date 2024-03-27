"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import qs from "query-string";
import { safeUserType } from "@/types/safeuser";
import { safeReservationType } from "@/types/safeReservation";
import { safeReviewType } from "@/types/safeReviewType";
export type clientsQueryParams = {
  type?: "RESERVATIONS" | "REVIEWS" | "MAIN_DASHBOARD";
  paginate?: boolean;
};
const useClients = (params?: clientsQueryParams) => {
  const query = qs.stringifyUrl({
    url: "/api/clients",
    query: params,
  });
  const { data: clients, error, isLoading, mutate } = useSWR(query, fetcher);
  return {
    clients: (clients || []) as Array<
      safeUserType & {
        reservations: safeReservationType[];
        feedbacks: safeReviewType[];
      }
    >,
    error,
    isLoading,
    mutate,
  };
};
export default useClients;
