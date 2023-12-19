"use client";
import useCountry from "@/hooks/useCountry";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import HeartButton from "../inputs/HeartButton";
import Button from "../inputs/Button";
import { safeListingType } from "@/types/safeListing";

const ListingCard = ({
  listing,
  className,
  user,
  reservation,
  action,
  disabled,
}: {
  disabled?: boolean;
  reservation?: Reservation;
  user?: safeUserType | null;
  className?: string;
  listing: safeListingType;
  action?: {
    onAction: (id: string) => void;
    actionLabel: string;
    actionId: string;
  };
}) => {
  const { getByValue } = useCountry();
  const router = useRouter();

  const location = (location: string) => {
    return getByValue(location);
  };

  const hanleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled && !action) {
        return;
      }
      action?.onAction(action.actionId);
    },
    [action, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listing.price;
  }, [reservation, listing.price]);

  const resrevationData = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className={twMerge("col-span-1 cursor-pointer group drop-shadow-2xl", className)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative rounded-xl overflow-hidden">
          <Image
            src={listing.imageSrc}
            alt={listing.title}
            className="object-cover h-full group-hover:scale-110 transition w-full"
            fill
            placeholder={"blur"}
            blurDataURL={listing.imageSrc}
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton id={listing.id} user={user} />
          </div>
        </div>
        <div className="font-semibold text-lg ">
          {!!location(listing.locationValue) &&
            location(listing.locationValue)?.region +
              ", " +
              location(listing.locationValue)?.label}
        </div>
        <div className="font-light text-neutral-500">
          {resrevationData || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light ">night</div>}
        </div>
        {action && (
          <Button
            label={action.actionLabel}
            className=""
            disabled={disabled}
            small
            onClick={hanleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
