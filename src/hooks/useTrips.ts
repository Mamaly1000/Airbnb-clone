"use client";
import fetcher from "@/libs/fetcher";
import { safeReservationType } from "@/types/safeReservation";
import { Reservation } from "@prisma/client";
import useSWR from "swr";

const useTrips = () => {
  const { data, error, mutate, isLoading } = useSWR(`/api/trips`, fetcher);
  return {
    trips: (data || null) as Reservation[] | safeReservationType[],
    error,
    isLoading,
    mutate,
  };
};

export default useTrips;
