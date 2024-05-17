"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useLocations from "@/hooks/useLocations";
import dynamic from "next/dynamic";
import Loader from "../ui/Loader";
import { useExploreLocation } from "@/hooks/useExploreLocation";
const LargeMap = dynamic(() => import("@/components/Map/LargeMap"), {
  loading: () => (
    <Loader
      size={25}
      className="min-w-full max-w-full h-[400px] max-h-[400px] flex items-center justify-center bg-white dark:bg-neutral-900"
    />
  ),
  ssr: false,
});
const DashboardMapSection = () => {
  const router = useRouter();
  const { locations } = useLocations();
  const { setLocation } = useExploreLocation();
  return (
    <section className="col-span-12 lg:col-span-6 min-h-[400px] p-3 rounded-lg drop-shadow-2xl bg-white dark:bg-neutral-900 flex flex-col items-start justify-between gap-2">
      <div className="min-w-full max-w-full flex items-start justify-start">
        <span className="text-sm md:text-lg capitalize font-semibold">
          explore your properties
        </span>
      </div>
      <LargeMap
        onClick={(l) => {
          router.push(`/mydashboard/explore`);
          setLocation(l.locationValue);
        }}
        locations={locations}
        className="min-h-[200px] min-w-full max-w-full "
      />
    </section>
  );
};

export default DashboardMapSection;
