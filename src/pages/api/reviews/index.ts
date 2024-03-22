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
      return res.status(401).json({ message: "unAuthrized" });
    }
    const {}: any = req.query;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting reviews", error });
  }
}
