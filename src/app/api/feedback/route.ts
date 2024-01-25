import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { reservationId, listingId, message, rating } = body;
  if (!reservationId || !listingId || !message || !rating) {
    console.log("missing fields");
    return NextResponse.error();
  }
  // update listing rating
  const selectedListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    select: {
      rate: true,
    },
  });
  if (!selectedListing) {
    console.log("invalid listing id");
    return NextResponse.error();
  }
  // get average rating
  const listingRate = selectedListing?.rate || 0;

  const newRating = Math.round((listingRate + rating) / 2);
  // update listing with new rating
  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      rate: newRating,
    },
  });
  if (!updatedListing) {
    console.log("failed to update the rating");

    return NextResponse.error();
  }
  // create the feedback
  const newFeedback = await prisma.feedback.create({
    data: {
      body: message,
      listingId,
      userId: user.id,
      rating,
      likingIds: [],
    },
  });

  if (!newFeedback) {
    console.log("failed to create a new feedback");

    return NextResponse.error();
  }
  // update the reservation status
  await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "COMPLETED",
    },
  });

  return NextResponse.json({
    message: "thanks for your feedback",
    newFeedback,
  });
}