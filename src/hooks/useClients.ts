"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useClients = () => {
  const {
    data: clients,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/clients", fetcher);
  return {
    clients: (clients || []) as { id: string; name: string; email: string }[],
    error,
    isLoading,
    mutate,
  };
};
export default useClients;
