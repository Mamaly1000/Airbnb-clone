import useCountry from "@/hooks/useCountry";
import { LocationDataType } from "@/hooks/useLocations";
import { LatLngExpression } from "leaflet";
import Link from "next/link";
import React, { useMemo } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";

const CutomMarker = ({
  location,
  onClick,
}: {
  onClick: (l: typeof location) => void;
  location: LocationDataType;
}) => {
  const { getByValue } = useCountry();
  const geo: LatLngExpression = useMemo(() => {
    return (getByValue(location.locationValue)?.latlng || [
      40, 34,
    ]) as L.LatLngExpression;
  }, [location]);
  const locationString = useMemo(() => {
    const l = getByValue(location.locationValue);
    return `${l?.label},${l?.region}`;
  }, [location]);
  return (
    <Marker position={geo}>
      <Popup
        position={geo}
        offset={[0, 3]}
        className="bg-white dark:bg-neutral-800 rounded-[5px] flex items-center justify-center p-0 m-0 "
      >
        <div className="min-w-full max-w-full min-h-full max-h-full flex flex-col items-start justify-start gap-1 text-neutral-500 dark:text-neutral-200 capitalize bg-white dark:bg-neutral-800 font-light">
          <div className="min-w-full max-w-full flex items-center justify-between gap-2">
            <span>average price:</span>
            <span className="font-semibold text-black dark:text-white  ">
              ${location.averagePrice.toFixed(2)}
            </span>
          </div>
          <div className="min-w-full max-w-full flex items-center justify-between gap-2">
            <span>categories:</span>
            <span className="font-semibold text-black dark:text-white  ">
              {location.relatedCategories.toString()}
            </span>
          </div>
          <div className="min-w-full max-w-full flex items-center justify-between gap-2">
            <span>total listings:</span>
            <span className="font-semibold text-black dark:text-white  ">
              {location.listingsCount}
            </span>
          </div>
          <button
            onClick={(e) => onClick(location)}
            className="min-w-full max-w-full flex items-center justify-center px-3 py-2 rounded-lg drop-shadow-2xl bg-black dark:bg-rose-500 text-white dark:text-white capitalize font-semibold"
          >
            check now
          </button>
        </div>
      </Popup>
      <Tooltip
        eventHandlers={{
          click: () => {
            onClick(location);
          },
        }}
        position={geo}
        className="rounded-[5px] drop-shadow-2xl bg-white dark:bg-neutral-800 text-black dark:text-white text-clip p-0 m-0"
        direction="bottom"
        opacity={1}
      >
        <div className="min-w-full max-w-full min-h-full max-h-full flex items-center justify-center bg-white dark:bg-neutral-800 font-bold rounded-[5px] relative">
          {locationString}
        </div>
      </Tooltip>
    </Marker>
  );
};

export default CutomMarker;
