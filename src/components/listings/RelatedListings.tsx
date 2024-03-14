import { safeListingType } from "@/types/safeListing";
import React from "react";
import ListingList from "../lists/ListingList";
import Link from "next/link";

const RelatedListings = ({
  listings,
  category,
}: {
  category?: string;
  listings: safeListingType[];
}) => {
  return (
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-3 pt-10">
      <ListingList
        containerClassName="grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
        className="p-0 xl:px-0 min-w-full max-w-full m-0 flex items-start justify-start flex-col"
        listings={listings}
        emptyState={{
          title: "no related listing!",
          subTitle: "there is no listing with the same category.",
        }}
        header={{
          title: "related Listings",
        }}
        pagination={{ hasMore: false } as any}
      />
      <Link
        className="min-w-full px-3 py-2 rounded-lg drop-shadow-2xl hover:bg-opacity-70 active:scale-90 max-w-full bg-black dark:bg-rose-500 text-white capitalize text-lg font-light text-center transition-all"
        href={`/?category=${category}`}
      >
        view all
      </Link>
    </section>
  );
};

export default RelatedListings;
