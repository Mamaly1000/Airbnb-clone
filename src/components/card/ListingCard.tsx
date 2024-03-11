"use client";
import useCountry from "@/hooks/useCountry";
import { safeUserType } from "@/types/safeuser";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import HeartButton from "../inputs/HeartButton";
import Button from "../inputs/Button";
import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import RateInput from "../inputs/RateInput";
import placeholder from "../../images/placeholder-image.jpg";
import { motion } from "framer-motion";
import { listingActionsType } from "@/types/ListingActions";

const ListingCard = ({
  listing,
  className,
  user,
  reservation,
  action,
  disabled,
  updateAction,
  Outdated = false,
  feedback = false,
  Edit,
  Remove,
  Review,
  Cancel,
  index = 0,
}: {
  feedback?: boolean;
  Outdated?: boolean;
  disabled?: boolean;
  reservation?: safeReservationType;
  user?: safeUserType | null;
  className?: string;
  listing: safeListingType;
  action?: {
    onAction: (id: string) => void;
    actionLabel: string;
    actionId: string;
  };
  updateAction?: {
    label: string;
    onClick: () => void;
  };
  index?: number;
} & listingActionsType) => {
  const { getByValue } = useCountry();
  const router = useRouter();

  const feedbackModal = useFeedbackModal();

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
    <motion.article
      initial={{ opacity: 0, translateX: 10 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 1, delay: index / 10 + 0.01 }}
      onClick={() => router.push(`/listings/${listing.id}`)}
      className={twMerge(
        "col-span-1 cursor-pointer group drop-shadow-2xl",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-full relative">
        {!!Outdated && (
          <div className="absolute z-10 top-0 left-0 w-[50px] h-[50px]  flex items-center justify-center whitespace-pre-wrap gap-1 capitalize bg-rose-500 bg-opacity-80 rounded-br-md rounded-tl-md drop-shadow-2xl text-[10px] text-white font-bold ">
            Outdated
          </div>
        )}
        <div className="aspect-square w-full relative rounded-xl overflow-hidden z-0">
          <Image
            src={!!listing.imageSrc ? listing.imageSrc : placeholder.src}
            alt={listing.title}
            className="object-cover h-full group-hover:scale-110 transition w-full"
            fill
            loading="lazy"
            placeholder={"blur"}
            blurDataURL={listing.imageSrc}
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton id={listing.id} user={user} />
          </div>
        </div>
        <div className="font-semibold text-lg line-clamp-1">
          {!!location(listing.locationValue) &&
            location(listing.locationValue)?.region +
              ", " +
              location(listing.locationValue)?.label}
        </div>
        <div className="font-light text-neutral-500 dark:text-neutral-400">
          {resrevationData || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light ">night</div>}
        </div>
        {action && (
          <Button
            label={action.actionLabel}
            className="relative z-20"
            disabled={disabled}
            small
            onClick={hanleCancel}
          />
        )}
        {Cancel && (
          <Button
            label={Cancel.label}
            className={twMerge("relative z-20", Cancel.className)}
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              Cancel.onClick(listing, reservation);
            }}
          />
        )}
        {Remove && (
          <Button
            label={Remove.label}
            className={twMerge("relative z-20", Remove.className)}
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              Remove.onClick(listing, reservation);
            }}
          />
        )}
        {!!updateAction && (
          <Button
            label={updateAction.label}
            className="bg-yellow-500 border-yellow-500 text-white relative z-20"
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              updateAction.onClick();
            }}
          />
        )}
        {!!Edit && (
          <Button
            label={Edit.label}
            className={twMerge(
              "bg-yellow-500 border-yellow-500 text-white relative z-20",
              Edit.className
            )}
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              Edit.onClick(listing, reservation);
            }}
          />
        )}
        {feedback && reservation?.status === "PENDING" && (
          <Button
            label={"Feedback to your trip"}
            className="bg-green-700 border-green-700 text-white relative z-20"
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              feedbackModal.onOpen({
                reservationId: reservation.id,
                listingId: reservation.listing.id,
              });
            }}
          />
        )}
        {Review && reservation?.status === "PENDING" && (
          <Button
            label={"Feedback to your trip"}
            className={twMerge(
              "bg-green-700 border-green-700 text-white relative z-20",
              Review.className
            )}
            disabled={disabled}
            small
            onClick={(e) => {
              e.stopPropagation();
              Review.onClick(listing, reservation);
            }}
          />
        )}
        <div className=" fill-rose-500">
          <RateInput
            id={listing.id}
            size="15px"
            val={listing.rate || 0}
            readOnly
          />
        </div>
      </div>
    </motion.article>
  );
};

export default ListingCard;
