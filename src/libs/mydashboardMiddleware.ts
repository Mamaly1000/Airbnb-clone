import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "./serverAuth";

export default async function mydashboardMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await serverAuth(req, res);

  if (!currentUser) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }

  const { pathname } = new URL(req.url!, "http://localhost");
  if (pathname.startsWith("/mydashboard/")) {
    // Add any additional logic here if needed
    // For example, check if the user has permission to access the dashboard
    // If not, you can return a 403 Forbidden status
  }

  return;
}
