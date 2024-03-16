"use client";
import SearchBar from "@/components/search-page/SearchBar";
import React from "react";

const SearchPage = () => {
  return (
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-8">
      <SearchBar />
    </section>
  );
};

export default SearchPage;
