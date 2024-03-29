import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).end();
  }
  try {
    const user = await serverAuth(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const {
      type,
      paginate = "false",
    }: {
      type?: "RESERVATIONS" | "REVIEWS" | "MAIN_DASHBOARD";
      paginate?: "false" | "true";
    } = req.query;
    let where: Prisma.UserWhereInput = {};
    if (type) {
      if (type === "RESERVATIONS") {
        where = {
          reservations: {
            some: {
              listing: {
                userId: user.currentUser.id,
              },
            },
          },
        };
      }
      if (type === "REVIEWS") {
        where = {
          feedbacks: {
            some: {
              listing: {
                userId: user.currentUser.id,
              },
            },
          },
        };
      }
      if (type === "MAIN_DASHBOARD") {
        where = {
          reservations: {
            some: {
              listing: {
                userId: user.currentUser.id,
              },
            },
          },
        };
      }
    }
    let usersWithReservations: any = [];
    if (type === "MAIN_DASHBOARD") {
      usersWithReservations = await prisma.user.findMany({
        where,
        select: {
          name: true,
          id: true,
          email: true,
          reservations: {
            where: {
              listing: {
                userId: user.currentUser.id,
              },
            },
          },
          feedbacks: {
            where:{
              listing:{
                userId:user.currentUser.id
              }
            }
          },
          createdAt: true,
        },
        take: 5,
      });
    }
    if (type !== "MAIN_DASHBOARD") {
      usersWithReservations = await prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    }
    return res.status(200).json(usersWithReservations || []);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in geting clients list.", error });
  }
}
