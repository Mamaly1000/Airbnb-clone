import fetcher from "@/libs/fetcher";
import { safeReservationType } from "@/types/safeReservation";
import useSWR from "swr";

const useReservations = (listingId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    listingId ? `/api/reservations?listingId=${listingId}` : null,
    fetcher
  );
  return {
    reservations: data as safeReservationType[] | null,
    error,
    isLoading,
    mutate,
  };
};

export default useReservations;
