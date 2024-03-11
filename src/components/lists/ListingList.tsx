import { isEmpty } from "lodash";
import React from "react";
import EmptyState from "../ui/EmptyState";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import ListingCard from "../card/ListingCard";
import { safeUserType } from "@/types/safeuser";
import { safeListingType } from "@/types/safeListing";
import { twMerge } from "tailwind-merge";

const ListingList = ({
  listings,
  emptyState,
  header,
  user,
  className,
  main,
}: {
  main?: boolean;
  className?: string;
  user: safeUserType;
  emptyState?: {
    title: string;
    subTitle?: string;
  };
  header?: {
    title: string;
    subTitle?: string;
  };
  listings: safeListingType[];
}) => {
  if (isEmpty(listings)) {
    return (
      <EmptyState
        title={emptyState ? emptyState.title : "There is no listing here!"}
        subTitle={
          emptyState?.subTitle ? emptyState.subTitle : "lets make a reservation"
        }
        redirect
      />
    );
  }
  return (
    <Container
      main={main}
      classname={twMerge("min-w-full max-w-full", className)}
    >
      {header && <Heading title={header.title} subtitle={header?.subTitle} />}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {listings.map((listing, i) => {
          return (
            <ListingCard
              index={i}
              listing={listing as any}
              user={user}
              key={listing.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ListingList;
