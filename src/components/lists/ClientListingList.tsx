"use client";
import useListings, { listingQueryHookType } from "@/hooks/useListings";
import React from "react";
import { twMerge } from "tailwind-merge";
import Loader from "../ui/Loader";
import Heading from "../form/Heading";
import ListingCard from "../card/ListingCard";
import EmptyState from "../ui/EmptyState";
import { isEmpty } from "lodash";
import { listingActionsType } from "@/types/ListingActions";
import Container from "../ui/Container";
import ClientListingPagination from "../pagination/ClientListingPagination";

const ClientListingList = ({
  params,
  Cancel,
  Edit,
  Remove,
  Review,
  containerClassName,
  emptyState,
  header,
  className,
  main,
  deletingId,
  loader,
}: {
  deletingId?: string;
  main?: boolean;
  className?: string;
  emptyState?: {
    title: string;
    subTitle?: string;
    className?: string;
  };
  header?: {
    title: string;
    subTitle?: string;
  };
  containerClassName?: string;
  params?: listingQueryHookType;
  loader?: { size?: number };
} & listingActionsType) => {
  const { isLoading, listings } = useListings(params);
  if (!isLoading && isEmpty(listings)) {
    return (
      <EmptyState
        title={emptyState ? emptyState.title : "There is no listing here!"}
        subTitle={
          emptyState?.subTitle ? emptyState.subTitle : "lets make a reservation"
        }
        className={emptyState?.className}
        redirect
      />
    );
  }
  if (isLoading) {
    return (
      <Loader
        className={twMerge(
          "min-w-full max-w-full flex items-center justify-center",
          emptyState?.className
        )}
        size={loader?.size || 20}
      />
    );
  }
  return (
    <Container
      main={main}
      classname={twMerge("min-w-full max-w-full pb-5", className)}
    >
      {header && <Heading title={header.title} subtitle={header?.subTitle} />}
      <div
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8",
          containerClassName,
          header ? "mt-5" : ""
        )}
      >
        {listings.map((listing, i) => {
          return (
            <ListingCard
              index={i}
              listing={listing as any}
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
      <ClientListingPagination params={params} />
    </Container>
  );
};

export default ClientListingList;
