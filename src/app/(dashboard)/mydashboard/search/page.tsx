"use client";
import ListingList from "@/components/lists/ListingList";
import SearchBar from "@/components/search-page/SearchBar";
import useListings from "@/hooks/useListings";
import React from "react";

const SearchPage = () => {
  const { setParams, isLoading, listings } = useListings();

  return (
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-8">
      <SearchBar onChange={setParams} />
      <ListingList
        emptyState={{
          title: "no result",
          subTitle: "it can be a typo or you should search more.",
          className:
            "min-w-full max-w-full flex flex-col items-center justify-center",
        }}
        isLoading={isLoading}
        listings={listings}
        className="pt-12 min-w-full max-w-full"
      />
    </section>
  );
};

export default SearchPage;
