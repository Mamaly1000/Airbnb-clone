"use client";
import ClientListingList from "@/components/lists/ClientListingList";
import Loader from "@/components/ui/Loader";
import useLocations from "@/hooks/useLocations";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
const ExplorePage = ({ searchParams }: { searchParams?: any }) => {
  const router = useRouter();
  const { locations } = useLocations();
  return (
    <section className="min-w-full max-w-full flex flex-wrap items-start justify-between gap-2">
      <LargeMap
        onClick={(l) =>
          router.push(`/mydashboard/explore?location=${l.locationValue}`)
        }
        locations={locations}
        className="min-h-[500px] min-w-full max-w-full md:min-w-[60%] md:max-w-[60%]"
      />
      <ClientListingList
        emptyState={{
          subTitle: "make sure to select correct location.",
          title: "select your target location",
          className:
            "min-w-full max-w-full md:min-w-[35%] md:max-w-[35%] flex items-center justify-center",
        }}
        params={searchParams}
        className="min-w-full max-w-full md:min-w-[35%] md:max-w-[35%] flex flex-col items-start justify-center lg:px-0 xl:px-0 md:px-0 sm:px-0 px-0 py-0 "
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
