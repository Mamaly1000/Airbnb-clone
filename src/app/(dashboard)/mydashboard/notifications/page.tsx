"use client";
import NotificationList from "@/components/lists/NotificationList";
import NotificationSearchContainer from "@/components/search-inputs/NotificationSearchContainer";
import React from "react";
import {
  NotificationFilterTypes,
  NotificationSortTypes,
} from "@/hooks/useNotifications";

const NotificationsPage = (params: {
  params: any;
  searchParams: {
    search?: string;
    filter?: NotificationFilterTypes;
    sort?: NotificationSortTypes;
  };
}) => {
  return (
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-4 relative">
      <NotificationSearchContainer />
      <NotificationList params={params.searchParams} />
    </section>
  );
};

export default NotificationsPage;
