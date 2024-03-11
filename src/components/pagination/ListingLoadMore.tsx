"use client";
import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import getListings from "@/actions/getListings";
import toast from "react-hot-toast";
import ListingList from "../lists/ListingList";
import Loader from "../ui/Loader";
import { safeUserType } from "@/types/safeuser";

const ListingLoadMore = ({
  user,
  params,
}: {
  params?: any;
  user: safeUserType;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [pagination, setPagination] = useState({
    maxPages: 0,
    hasMore: true,
  });
  const [lists, setLists] = useState<JSX.Element[]>([]);
  const getMoreListings = async () => {
    try {
      setLoading(true);
      await getListings({
        page,
        ...params,
      }).then((res) => {
        setPagination(res.pagination);
        setPage(page + 1);
        if (res.listings.length > 0) {
          setLists([
            ...lists,
            <ListingList
              className="py-0 mt-0"
              listings={res.listings}
              user={user}
            />,
          ]);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {lists}
      <AnimatePresence>
        {pagination.hasMore && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-w-full max-w-full flex items-center justify-center bg-white dark:bg-neutral-800 pt-5"
          >
            {isLoading && <Loader size={25} className="h-[100px]" />}
            {!isLoading && (
              <motion.button
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  getMoreListings();
                }}
                className="min-w-full max-w-full px-3 py-2 drop-shadow-2xl bg-rose-500 text-white disabled:opacity-50 capitalize font-bold"
              >
                show more
              </motion.button>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default ListingLoadMore;
