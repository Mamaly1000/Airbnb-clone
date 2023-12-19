import { Listing } from "@prisma/client";

export type safeListingType = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
