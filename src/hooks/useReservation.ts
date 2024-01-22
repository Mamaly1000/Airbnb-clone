"use client";

import fetcher from "@/libs/fetcher";
import { safeReservationType } from "@/types/safeReservation";
import useSWR from "swr";

const useReservation = (id?: string) => {
  const url = id ? `/api/reservations/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    reservation: data as safeReservationType | null,
    error,
    isLoading,
    mutate,
  };
};

export default useReservation;
