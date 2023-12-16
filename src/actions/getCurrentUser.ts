"use server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/libs/prismadb";
import { User } from "@prisma/client";
import { safeUserType } from "@/types/safeuser";

export async function getSession() {
  return getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt?.toISOString() || null,
      updatedAt: currentUser.updatedAt?.toISOString() || null,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    } as safeUserType;
  } catch (error) {
    return null;
  }
}
