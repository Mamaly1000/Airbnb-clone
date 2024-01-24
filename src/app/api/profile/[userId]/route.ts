import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId as string;
  if (!userId) {
    console.log("invalid id");
    return NextResponse.error();
  }
  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image: true,
      name: true,
    },
  });
  if (!profile) {
    console.log("user not found");
    return NextResponse.error();
  }
  return NextResponse.json(profile);
}
