import getCurrentUser from "@/actions/getCurrentUser";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
  const user = await serverAuth(req, res);
  if (!user) {
    return res.status(401).json({ message: "unAuthorized" });
  }
  return res.status(200).json(user.currentUser);
}
