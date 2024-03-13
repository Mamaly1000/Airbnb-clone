"use client";
import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import getListings from "@/actions/getListings";
import toast from "react-hot-toast";
import ListingList from "../lists/ListingList";
import Loader from "../ui/Loader";
import { safeUserType } from "@/types/safeuser";
import { useRouter } from "next/navigation";

const ListingLoadMore = ({
  user,
  params,
  pagination: listingPagination,
  favoritePage,
}: {
  favoritePage?: boolean;
  pagination: {
    hasMore: boolean;
    maxPages: number;
    total: number;
  };
  params?: any;
  user?: safeUserType | null;
}) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [pagination, setPagination] = useState(listingPagination);
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
        router.refresh();
        if (res.listings.length > 0) {
          setLists([
            ...lists,
            <ListingList
              favoritePage={favoritePage}
              pagination={res.pagination}
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
        {!!pagination?.hasMore && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-w-full max-w-full flex items-center justify-center bg-white dark:bg-neutral-800 pt-5 hover:scale-100 hover:opacity-50"
          >
            {isLoading && <Loader size={25} className="h-[100px]" />}
            {!isLoading && (
              <motion.button
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  getMoreListings();
                }}
                className="min-w-full max-w-full px-3 py-2 drop-shadow-2xl bg-rose-500 text-white disabled:opacity-50 capitalize font-bold hover:opacity-50 hover:scale-100"
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
