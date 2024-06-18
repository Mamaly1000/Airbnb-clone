import fetcher from "@/libs/fetcher";
import { safeListingType } from "@/types/safeListing";
import useSWR from "swr";

const useProperty = (id?: string) => {
  const url = id ? `/api/properties/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return {
    property: data as safeListingType | null,
    error,
    isLoading,
    mutate,
  };
};

export default useProperty;
