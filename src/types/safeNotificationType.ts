import { Notification } from "@prisma/client";
import { safeUserType } from "./safeuser";
import { safeListingType } from "./safeListing";
import { safeReservationType } from "./safeReservation";

export interface SafeNotificationType extends Notification {
  actionUser: safeUserType;
  listing: safeListingType;
  reservation: safeReservationType;
}
