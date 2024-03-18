import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

export async function PATCH(_request: Request, { params }: { params: any }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error(
      "You must login or register to an account for doing this action!"
    );
  }
  const { id } = params;
  if (!id || typeof id !== "string") {
    throw new Error("Invalid Id");
  }
  const targetNotification = await prisma.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
  return NextResponse.json({
    message: "notification seen",
    targetNotification,
  });
}
