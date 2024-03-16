import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { listingSortType } from "@/components/search-page/SortSelect";
import { listingFilterType } from "@/components/search-page/FilterSelect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).end();
  }
  try {
    if (req.method === "GET") {
      const currentUser = await serverAuth(req, res);
      if (!currentUser) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const {
        min,
        max,
        search,
        category,
        location,
        sort,
        filter,
      }: {
        min?: string;
        max?: string;
        search?: string;
        category?: string;
        location?: string;
        sort?: listingSortType;
        filter?: listingFilterType;
      } = req.query;
      let where: any = {};
      let orderBy: any = {
        createdAt: "desc",
      };
      if (min && max) {
        if (+min === 0 && +max !== 0) {
          where.price = {
            lte: +max,
          };
        } else if (+min !== 0 && +max === 0) {
          where.price = {
            gte: +min,
          };
        } else if (!!max && !!min) {
          where.price = {
            gte: +min,
            lte: +max,
          };
        }
      }
      if (search) {
        where = {
          ...where,
          OR: [
            {
              title: { contains: search },
              description: { contains: search },
              category: { contains: search },
            },
            {
              title: { startsWith: search },
              description: { startsWith: search },
              category: { startsWith: search },
            },
            {
              title: { endsWith: search },
              description: { endsWith: search },
              category: { endsWith: search },
            },
          ],
        };
      }
      if (location) {
        where.locationValue = location;
      }
      if (category) {
        where.category = category;
      }
      if (filter) {
        if (filter === "ALL") {
          delete where.userId;
        }
        if (filter === "MY PROPERTIES") {
          where.userId = currentUser.currentUser.id;
        }
        if (filter === "FAVORITES") {
          where.id = {
            in: currentUser.currentUser.favoriteIds,
          };
        }
      }
      if (sort) {
        if (sort === "LOWER PRICE") {
          orderBy = {
            price: "asc",
          };
        }
        if (sort === "TOP PRICE") {
          orderBy = {
            price: "desc",
          };
        }
        if (sort === "NEWEST") {
          orderBy = {
            createdAt: "desc",
          };
        }
        if (sort === "OLDEST") {
          orderBy = {
            createdAt: "asc",
          };
        }
      }
      const maxPrice = await prisma.listing.aggregate({
        _max: {
          price: true,
        },
      });

      const listings = await prisma.listing.findMany({
        where,
        orderBy,
      });

      const safeListings =
        listings.map((listing) => ({
          ...listing,
          createdAt: listing.createdAt.toISOString(),
        })) || [];
      return res
        .status(200)
        .json({ listings: safeListings, maxPrice: maxPrice._max.price });
    }
    if (req.method === "POST") {
      const currentUser = await serverAuth(req, res);
      if (!currentUser) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const body = req.body;
      const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
      } = body;
      Object.keys(body).forEach((value) => {
        if (!!!body[value]) {
          res.status(405).json({ message: `${body[value]} is missing!` });
        }
      });

      const listing = await prisma.listing.create({
        data: {
          bathroomCount,
          category,
          description,
          guestCount,
          imageSrc,
          locationValue: location.value,
          price: parseInt(price, 10),
          roomCount,
          title,
          userId: currentUser.currentUser.id,
        },
      });

      return res.status(200).json({ listing, message: "listing created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "something went wrong!" });
  }
}
