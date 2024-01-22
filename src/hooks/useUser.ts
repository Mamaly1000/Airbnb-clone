"use client";

import fetcher from "@/libs/fetcher";
import { safeUserType } from "@/types/safeuser";
import { User } from "@prisma/client";
import useSWR from "swr";

const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/current", fetcher);
  return {
    user: user as safeUserType | null,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
