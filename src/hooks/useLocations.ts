import fetcher from "@/libs/fetcher";
import useSWR from "swr";

export type LocationDataType = {
  locationValue: string;
  listingsCount: number;
  relatedCategories: string[];
  averagePrice: number;
};

const useLocations = () => {
  const {
    data: locations,
    isLoading,
    mutate,
    error,
  } = useSWR(`/api/locations`, fetcher);
  return {
    locations: (locations || []) as LocationDataType[],
    isLoading,
    mutate,
    error,
  };
};

export default useLocations;
