import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      return res.status(401).json({ message: "unAuthorized!" });
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.currentUser.id,
      },
      include: {
        actionUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return res.status(200).json(notifications || []);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting notifications" });
  }
}
