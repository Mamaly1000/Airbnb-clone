import React from "react";
import Heading from "../form/Heading";
import Container from "../ui/Container";
import { reservertionReturnDataType } from "@/actions/getReservations";
import ListingCard from "../card/ListingCard";
import { listingActionsType } from "@/types/ListingActions";
import EmptyState from "../ui/EmptyState";
import { isEmpty } from "lodash";
import { safeUserType } from "@/types/safeuser";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const ReservationList = ({
  reservations,
  pagination,
  Cancel,
  Edit,
  Remove,
  Review,
  empty,
  disabled,
  user,
  header,
  deletingId,
  className,
  feedback,
  main,
  Outdated,
}: reservertionReturnDataType &
  listingActionsType & {
    empty?: {
      title: string;
      subTitle?: string;
    };
    header?: {
      title: string;
      subTitle?: string;
    };
    disabled?: boolean;
    user?: safeUserType | null;
    deletingId?: string;
    className?: string;
    feedback?: boolean;
    main?: boolean;
    Outdated?: boolean;
  }) => {
  if (isEmpty(reservations)) {
    return (
      <EmptyState
        title={empty?.title || "No trips found"}
        subTitle={
          empty?.subTitle || "Looks like you haven`t reserved any trips!"
        }
        redirect
      />
    );
  }
  return (
    <Container
      main={main}
      classname={twMerge(
        "min-w-full max-w-full flex flex-col items-start justify-start gap-4",
        pagination.hasMore ? "pb-0" : "pb-4",
        className
      )}
    >
      {!!header && (
        <Heading
          title={header.title || "reservations"}
          subtitle={
            header?.subTitle || "Where you`ve been and where you`re going"
          }
        />
      )}
      <motion.section
        className={twMerge(
          `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
           xl:grid-cols-5 gap-8 min-w-full max-w-full`,
          header && "mt-10"
        )}
      >
        {reservations.map((reservation, i) => {
          return (
            <ListingCard
              Outdated={Outdated}
              index={i}
              listing={reservation.listing}
              key={reservation.id}
              reservation={reservation}
              disabled={disabled || deletingId === reservation.id}
              user={user}
              Cancel={Cancel}
              Remove={Remove}
              Edit={Edit}
              Review={Review}
              feedback={feedback}
            />
          );
        })}
      </motion.section>
    </Container>
  );
};

export default ReservationList;
