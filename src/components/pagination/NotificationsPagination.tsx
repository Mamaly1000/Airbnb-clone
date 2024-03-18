"use client";
import useNotifications, {
  notificationQueryParams,
} from "@/hooks/useNotifications";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Loader from "../ui/Loader";

const NotificationsPagination = ({
  params,
}: {
  params?: notificationQueryParams;
}) => {
  const { isLoading, onNextPage, pagination } = useNotifications(params);
  return (
    <AnimatePresence>
      {pagination.hasMore && (
        <motion.section
          className="min-w-full max-w-full flex items-start justify-start p-0 m-0 py-3"
          initial={{ opacity: 0, translateY: 20 }}
          exit={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.15, ease: "linear" }}
        >
          {isLoading ? (
            <Loader size={20} className="min-w-full max-w-full" />
          ) : (
            <button
              disabled={!pagination.hasMore}
              onClick={onNextPage}
              className="hover:scale-100 active:scale-90 hover:bg-opacity-60 bg-black text-white dark:bg-rose-500 capitalize min-w-full rounded-lg drop-shadow-2xl px-3 py-2  max-w-full text-center text-sm disabled:opacity-50"
            >
              show more
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPagination;
