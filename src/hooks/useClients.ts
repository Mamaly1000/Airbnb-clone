"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import qs from "query-string";
export type clientsQueryParams = {
  type?: "RESERVATIONS" | "REVIEWS";
  paginate?: boolean;
};
const useClients = (params?: clientsQueryParams) => {
  const query = qs.stringifyUrl({
    url: "/api/clients",
    query: params,
  });
  const { data: clients, error, isLoading, mutate } = useSWR(query, fetcher);
  return {
    clients: (clients || []) as { id: string; name: string; email: string }[],
    error,
    isLoading,
    mutate,
  };
};
export default useClients;
