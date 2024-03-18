import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
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
  const targetNotification = await prisma.notification.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({
    message: "notification deleted!",
    targetNotification,
  });
}
