import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getListingById } from "@/actions/getListingById";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const propertyId = params.id as string;
  if (!propertyId || typeof propertyId !== "string") {
    return NextResponse.error();
  }
  const property = await getListingById(propertyId);
  return NextResponse.json(property);
}
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
  Object.keys(body).forEach((value) => {
    if (!!!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.update({
    where: {
      id: params.id,
    },
    data: {
      bathroomCount,
      category,
      description,
      guestCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      roomCount,
      title,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({
    message: "listing updated",
    listing,
  });
}
