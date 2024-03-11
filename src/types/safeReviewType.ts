import { Feedback, Listing } from "@prisma/client";

export type safeReviewType = Feedback & {
  comments: {
    authorId: string;
  }[];
  user: {
    id: string;
    createdAt: Date | null;
    name: string | null;
    email: string | null;
  };
  listing: Listing;
};
