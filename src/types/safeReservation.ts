import { Reservation } from "@prisma/client";
import { safeListingType } from "./safeListing";

export type safeReservationType = Omit<
  Reservation,
  "listing" | "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: safeListingType;
};
