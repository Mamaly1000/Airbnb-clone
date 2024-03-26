"use client";
import ClientListingList from "@/components/lists/ClientListingList";
import FootNote from "@/components/shared/FootNote";
import Loader from "@/components/ui/Loader";
import useLocations from "@/hooks/useLocations";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
const LargeMap = dynamic(() => import("@/components/Map/LargeMap"), {
  loading: () => (
    <Loader
      size={25}
      className="min-w-full max-w-full lg:min-w-[48%] lg:max-w-[48%] flex items-center justify-center"
    />
  ),
  ssr: false,
});
const ExplorePage = ({ searchParams }: { searchParams?: any }) => {
  const router = useRouter();
  const { locations } = useLocations();
  return (
    <section className="min-w-full max-w-full flex flex-wrap items-start justify-between gap-x-[4%] min-h-fit">
      <LargeMap
        onClick={(l) =>
          router.push(`/mydashboard/explore?location=${l.locationValue}`)
        }
        locations={locations}
        className="min-h-[500px] min-w-full max-w-full lg:min-w-[48%] lg:max-w-[48%] mb-5 lg:mb-0"
      />
      <ClientListingList
        className="min-w-full max-w-full lg:min-w-[48%] lg:max-w-[48%] flex flex-col items-start justify-start lg:px-0 xl:px-0 md:px-0 sm:px-0 px-0  py-0 mt-3 lg:mt-0  "
        containerClassName="min-w-full max-w-full min-h-[500px] lg:max-h-[500px] lg:overflow-auto overflow-x-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        params={searchParams}
        emptyState={{
          subTitle: "make sure to select correct location.",
          title: "select your target location",
          className:
            "min-w-full max-w-full lg:min-w-[48%] lg:max-w-[48%] flex items-center justify-center",
        }}
        header={{
          title: "available for booking.",
          subTitle: "founded listings for selected locations",
        }}
        loader={{
          size: 25,
        }}
      />
      <FootNote
        notes={[
          { note: "you can check all listings related to specific location" },
          {
            note: "you can select map markers to check selected location listings",
          },
          {
            note: "by clicking on the locations you can see some overall datas for more information",
          },
        ]}
      />
    </section>
  );
};

export default ExplorePage;
