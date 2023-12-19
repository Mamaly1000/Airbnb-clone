import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
  _request: Request,
  { params }: { params: { listing_id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  console.log(params.listing_id);

  if (!params.listing_id || typeof params.listing_id !== "string") {
    throw new Error("Invalid ID");
  }
  const listing = await prisma.listing.deleteMany({
    where: {
      id: params.listing_id,
      userId: user.id,
    },
  });

  return NextResponse.json({ listing, message: "deleted successfully!" });
}
