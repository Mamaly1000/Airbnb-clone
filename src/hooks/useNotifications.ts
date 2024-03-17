"use client";
import fetcher from "@/libs/fetcher";
import { Notification } from "@prisma/client";
import useSWR from "swr";

const useNotifications = () => {
  const {
    data: notifications,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/notifications", fetcher);
  return {
    notifications: (notifications || []) as Notification[],
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
