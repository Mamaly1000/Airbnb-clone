"use client";
import React, { ReactNode } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { twMerge } from "tailwind-merge";
import CutomMarker from "./CutomMarker";
import { LocationDataType } from "@/hooks/useLocations";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});
const LargeMap = ({
  className,
  locations,
  onClick,
}: {
  onClick: (location: LocationDataType) => void;
  locations?: {
    locationValue: string;
    listingsCount: number;
    relatedCategories: string[];
    averagePrice: number;
  }[];
  className?: string;
}) => {
  return (
    <MapContainer
      center={[32, 53]}
      zoom={2}
      scrollWheelZoom={false}
      className={twMerge(
        "h-[35vh] rounded-lg border-[1px] border-neutral-300 dark:border-rose-500",
        className
      )}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations?.map((l, i) => (
        <CutomMarker onClick={onClick} key={l.locationValue + i} location={l} />
      ))}
    </MapContainer>
  );
};

export default LargeMap;
