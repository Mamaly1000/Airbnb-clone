import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(_request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const trips = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(trips || []);
}
