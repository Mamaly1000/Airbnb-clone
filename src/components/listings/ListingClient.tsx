"use client";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "../categories/Categories";
import Container from "../ui/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import ListingReservation from "./ListingReservation";
import { safeReservationType } from "@/types/safeReservation";
import { motion } from "framer-motion";
import ListingReviews from "./ListingReviews";
import { Feedback } from "@prisma/client";
import { safeReviewType } from "@/types/safeReviewType";
export const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  listing,
  user,
  reservations = [],
  reviews,
}: {
  reviews?: safeReviewType[];
  listing: safeListingType & {
    user: safeUserType;
  };
  user?: safeUserType | null;
  reservations?: safeReservationType[];
}) => {
  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();
  const router = useRouter();
  const disableDate = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const createReservation = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }
    setLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then((res: { data: any }) => {
        toast.success(res.data.message);
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error("something went wrong!");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, loginModal, dateRange, router, listing.id, totalPrice]);
  const category = useMemo(() => {
    if (listing.category)
      return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dayCount && listing.price) {
        const total = dayCount * listing.price;
        setTotalPrice(total > 0 ? total : -total);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container main classname="min-w-full max-w-full pt-44">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
        <ListingHead
          listing={{
            title: listing.title,
            image: listing.imageSrc,
            locationValue: listing.locationValue,
            id: listing.id,
            user: listing.user,
          }}
          user={user}
        />
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"
        >
          <ListingInfo
            listing={{
              user: listing.user,
              category: category,
              description: listing.description,
              roomCount: listing.roomCount,
              guestCount: listing.guestCount,
              bathroomCount: listing.bathroomCount,
              locationVlaue: listing.locationValue,
              id: listing.id,
              rate: listing.rate,
            }}
            user={user}
          />
          <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="order-first mb-10 md:order-last md:col-span-3"
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              dateRange={dateRange}
              disabled={isLoading}
              onChangeDate={(value: typeof dateRange) => setDateRange(value)}
              onSubmit={createReservation}
              disabledDate={disableDate}
            />
          </motion.div>
        </motion.div>
        <ListingReviews
          initialData={reviews}
          params={{
            listingId: listing.id,
          }}
        />
      </div>
    </Container>
  );
};

export default ListingClient;
