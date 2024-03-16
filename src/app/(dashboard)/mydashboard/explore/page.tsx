"use client";
import ListingList from "@/components/lists/ListingList";
import Loader from "@/components/ui/Loader";
import useListings from "@/hooks/useListings";
import useLocations from "@/hooks/useLocations";
import dynamic from "next/dynamic";
import React from "react";
const LargeMap = dynamic(() => import("@/components/Map/LargeMap"), {
  loading: () => (
    <Loader
      size={25}
      className="min-w-full max-w-full md:min-w-[60%] md:max-w-[60%] flex items-center justify-center"
    />
  ),
  ssr: false,
});
const ExplorePage = () => {
  const { locations } = useLocations();
  const { listings, setParams } = useListings();
  return (
    <section className="min-w-full max-w-full flex flex-wrap items-start justify-between gap-2">
      <LargeMap
        locations={locations}
        onClick={(location) => setParams({ location: location.locationValue })}
        className="min-h-[500px] min-w-full max-w-full md:min-w-[60%] md:max-w-[60%]"
      />
      <ListingList
        emptyState={{
          subTitle: "make sure to select correct location.",
          title: "select your target location",
          className: "min-w-full max-w-full md:min-w-[35%] md:max-w-[35%] flex items-center justify-center",
        }}
        className="min-w-full max-w-full md:min-w-[35%] md:max-w-[35%] flex flex-col items-start justify-center lg:px-0 xl:px-0 md:px-0 sm:px-0 px-0 py-0 "
        listings={listings}
        containerClassName="min-w-full max-w-full min-h-[500px] md:max-h-[500px] md:overflow-auto overflow-x-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        header={{
          title: "available for booking.",
          subTitle: "founded listings for selected locations",
        }}
      />
    </section>
  );
};

export default ExplorePage;
