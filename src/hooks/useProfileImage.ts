import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useProfileImage = (id?: string) => {
  const url = id ? `/api/profile/${id}` : null;
  const { data: profile, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    profile: profile as {
      name: string | null;
      image: string | null;
    } | null,
    error,
    isLoading,
    mutate,
  };
};

export default useProfileImage;
