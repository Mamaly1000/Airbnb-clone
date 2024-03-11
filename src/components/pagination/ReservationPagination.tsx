"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";
import { safeUserType } from "@/types/safeuser";
import {
  getReservations,
  reservationQueryType,
} from "@/actions/getReservations";
import ReservationList from "../lists/ReservationList";
import { listingActionsType } from "@/types/ListingActions";

const ReservationPagination = ({
  user,
  params,
  pagination: reservationPagination,
  Cancel,
  Edit,
  Remove,
  Review,
  deletingId,
  actionLabel,
}: {
  actionLabel?: string;
  deletingId?: string;
  pagination: {
    total: number;
    hasMore: boolean;
    maxPages: number;
  };
  params?: reservationQueryType;
  user?: safeUserType;
} & listingActionsType) => {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [pagination, setPagination] = useState(reservationPagination);
  const [lists, setLists] = useState<JSX.Element[]>([]);
  const getMoreReservations = async () => {
    try {
      setLoading(true);
      await getReservations({
        page,
        ...params,
      }).then((res) => {
        setPagination(res.pagination);
        setPage(page + 1);
        if (res.reservations.length > 0) {
          setLists([
            ...lists,
            <ReservationList
              className="py-0 mt-0"
              pagination={res.pagination}
              reservations={res.reservations}
              Cancel={Cancel}
              Edit={Edit}
              Remove={Remove}
              Review={Review}
              deletingId={deletingId}
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
  useEffect(() => {
    setPagination(reservationPagination);
  }, [reservationPagination]);
  return (
    <>
      {lists}
      <AnimatePresence>
        {reservationPagination.hasMore && (
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
                  getMoreReservations();
                }}
                className="min-w-full max-w-full px-3 py-2 drop-shadow-2xl bg-rose-500 text-white disabled:opacity-50 capitalize font-bold"
              >
                {actionLabel || "show more..."}
              </motion.button>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReservationPagination;
