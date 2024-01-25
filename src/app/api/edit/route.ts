import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error(
      "You must login or register to an account for doing this action!"
    );
  }
  const { image, email, name } = await request.json();
  if (!!!email) {
    return NextResponse.error();
  }
  const existedEmail = await prisma.user.findFirst({
    where: {
      email: email,
      NOT: {
        id: currentUser.id,
      },
    },
  });
  if (existedEmail) {
    console.log("this email is already existed");
    return NextResponse.error();
  }
  const updatedProfile = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      image: !!image ? image : "",
      name: !!name ? name : "",
      email,
    },
  });

  return NextResponse.json({ message: "profile updated" });
}
