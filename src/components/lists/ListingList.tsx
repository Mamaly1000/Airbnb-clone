import { isEmpty } from "lodash";
import React from "react";
import EmptyState from "../ui/EmptyState";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import ListingCard from "../card/ListingCard";
import { safeUserType } from "@/types/safeuser";
import { safeListingType } from "@/types/safeListing";
import { twMerge } from "tailwind-merge";
import { listingActionsType } from "@/types/ListingActions";

const ListingList = ({
  listings,
  emptyState,
  header,
  user,
  className,
  main,
  pagination,
  favoritePage,
  Cancel,
  Edit,
  Remove,
  Review,
  deletingId,
}: {
  deletingId?: string;
  favoritePage?: boolean;
  pagination?: {
    hasMore: boolean;
    maxPages: number;
    total: number;
  };
  main?: boolean;
  className?: string;
  user?: safeUserType | null;
  emptyState?: {
    title: string;
    subTitle?: string;
  };
  header?: {
    title: string;
    subTitle?: string;
  };
  listings: safeListingType[];
} & listingActionsType) => {
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
      classname={twMerge(
        "min-w-full max-w-full",
        className,
        pagination?.hasMore ? "pb-0" : "pb-4"
      )}
    >
      {header && <Heading title={header.title} subtitle={header?.subTitle} />}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {listings.map((listing, i) => {
          return (
            <ListingCard
              favoritePage={favoritePage}
              index={i}
              listing={listing as any}
              user={user}
              key={listing.id}
              Cancel={Cancel}
              Edit={Edit}
              Remove={Remove}
              Review={Review}
              disabled={deletingId === listing.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ListingList;
