"use client";
import useNotifications, {
  notificationQueryParams,
} from "@/hooks/useNotifications";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";
import NotifCard from "../card/NotifCard";
import NotificationsPagination from "../pagination/NotificationsPagination";

const NotificationList = ({ params }: { params?: notificationQueryParams }) => {
  const { isLoading, notifications, error } = useNotifications(params);
  const content = useMemo(() => {
    if (isEmpty(notifications) && !isLoading) {
      return (
        <EmptyState
          className="min-w-full max-w-full flex items-center justify-center"
          title="you have no notification."
          subTitle="your notifications list is empty."
          refresh
        />
      );
    }
    if (isEmpty(notifications) && isLoading) {
      return (
        <Loader
          className="min-w-full max-w-full flex items-center justify-center"
          size={30}
        />
      );
    }
    return (
      <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-0 pb-10">
        {notifications.map((n, i) => (
          <NotifCard params={params} index={i} notif={n} key={n.id} />
        ))}
        <NotificationsPagination params={params} />
      </section>
    );
  }, [isLoading, notifications, error]);
  return (
    <section className="min-w-full max-w-full flex-col items-start justify-start gap-2">
      {content}
    </section>
  );
};

export default NotificationList;
