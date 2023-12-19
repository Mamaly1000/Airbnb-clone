import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { reservation_id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  if (!params.reservation_id || typeof params.reservation_id !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: params.reservation_id,
      OR: [
        { userId: user.id },
        {
          listing: {
            userId: user.id,
          },
        },
      ],
    },
  });

  return NextResponse.json({ reservation, message: `Reservation Deleted!` });
}
