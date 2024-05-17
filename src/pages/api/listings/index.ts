import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { listingSortType } from "@/components/search-page/SortSelect";
import { listingFilterType } from "@/components/search-page/FilterSelect";
import { Listing, Prisma } from "@prisma/client";

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
        page,
        userId,
        paginate,
        isActive,
      }: {
        isActive?: string;
        paginate?: string;
        userId?: string;
        min?: string;
        max?: string;
        search?: string;
        category?: string;
        location?: string;
        sort?: listingSortType;
        filter?: listingFilterType;
        page?: string;
      } = req.query;
      let where: Prisma.ListingWhereInput = {};
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
            },
            {
              category: { contains: search },
            },
            {
              description: { contains: search },
            },
          ],
        };
      }
      if (location) {
        where.locationValue = location;
      }
      if (category) {
        where.category = { contains: category };
      }
      if (filter) {
        if (filter === "ALL") {
          delete where.userId;
        }
        if (filter === "MY PROPERTIES") {
          where.userId = currentUser.currentUser.id;
        }
        if (filter === "FAVORITES") {
          where.id = { in: currentUser.currentUser.favoriteIds };
        }
        if (filter === "REVIEWED") {
          where = {
            feedbacks: {
              some: {},
            },
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
      if (userId) {
        where = {
          ...where,
          userId,
        };
      }
      if (!!isActive) {
        where = {
          AND: [
            { userId: currentUser.currentUser.id },
            { reservations: { some: {} } },
          ],
        };
      }
      const maxPrice = await prisma.listing.aggregate({
        _max: {
          price: true,
        },
      });

      const currentPage = +(page || 1);
      const limit = 10;
      const skip = (currentPage - 1) * limit;
      const totalListings = await prisma.listing.count({ where });
      const maxPages = Math.ceil(totalListings / limit);
      let listings: Listing[] = [];
      if (!!!paginate || paginate === "true") {
        listings = await prisma.listing.findMany({
          where,
          orderBy,
          skip,
          take: limit + 1,
        });
      }
      if (paginate === "false" && !!paginate) {
        listings = await prisma.listing.findMany({
          where,
          orderBy,
        });
      }

      const hasMore = listings.length > limit;
      if (hasMore) {
        listings.pop();
      }
      const safeListings =
        listings.map((listing) => ({
          ...listing,
          createdAt: listing.createdAt.toISOString(),
        })) || [];
      return res.status(200).json({
        listings: safeListings,
        maxPrice: maxPrice._max.price,
        pagination: {
          maxPages,
          page: currentPage,
          nextPage: currentPage + 1,
          total: totalListings,
          hasMore,
        },
      });
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
