import { safeListingType } from "./safeListing";
import { safeReservationType } from "./safeReservation";

export type listingActionsType = {
  Review?: {
    label: string;
    className?: string;
    onClick: (
      listing: safeListingType,
      reservation?: safeReservationType
    ) => void;
  };
  Remove?: {
    label: string;
    className?: string;
    onClick: (
      listing: safeListingType,
      reservation?: safeReservationType
    ) => void;
  };
  Edit?: {
    label: string;
    className?: string;
    onClick: (
      listing: safeListingType,
      reservation?: safeReservationType
    ) => void;
  };
  Cancel?: {
    label: string;
    className?: string;
    onClick: (
      listing: safeListingType,
      reservation?: safeReservationType
    ) => void;
  };
};
