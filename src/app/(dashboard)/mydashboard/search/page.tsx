"use client";
import ClientListingList from "@/components/lists/ClientListingList";
import SearchBar from "@/components/search-page/SearchBar";
import { usePropertySearch } from "@/hooks/usePropertySearch";
import React from "react";

const SearchPage = () => {
  const { params } = usePropertySearch();
  return (
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-8">
      <SearchBar />
      <ClientListingList
        emptyState={{
          title: "no result",
          subTitle: "it can be a typo or you should search more.",
          className:
            "min-w-full max-w-full flex flex-col items-center justify-center",
        }}
        params={params}
        className="pt-12 min-w-full max-w-full"
      />
    </section>
  );
};

export default SearchPage;
