import useListings, { listingQueryHookType } from "@/hooks/useListings";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Loader from "../ui/Loader";

const ClientListingPagination = ({
  params,
}: {
  params?: listingQueryHookType;
}) => {
  const { isLoading, onNextPage, pagination } = useListings(params);
  return (
    <AnimatePresence>
      {pagination.hasMore && (
        <motion.section
          initial={{ opacity: 0, translateY: 10 }}
          exit={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="min-w-full max-w-full flex items-center justify-center mt-5"
        >
          {isLoading ? (
            <Loader
              size={25}
              className="min-w-full max-w-full flex items-center justify-center"
            />
          ) : (
            <button
              className="min-w-full max-w-full px-3 py-2 text-sm font-semibold capitalize text-white bg-black dark:bg-rose-500 rounded-lg drop-shadow-2xl"
              disabled={isLoading}
              onClick={onNextPage}
            >
              show more...
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ClientListingPagination;
