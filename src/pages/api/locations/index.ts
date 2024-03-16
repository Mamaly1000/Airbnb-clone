import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const uniqueLocations = await prisma.listing.findMany({
      distinct: ["locationValue"],
      select: {
        locationValue: true,
      },
    });
    const locationInfoPromises = uniqueLocations.map(async (location) => {
      const listingsCount = await prisma.listing.count({
        where: {
          locationValue: location.locationValue,
        },
      });

      const averagePrice = await prisma.listing.aggregate({
        _avg: {
          price: true,
        },
        where: {
          locationValue: location.locationValue,
        },
      });

      const relatedCategories = await prisma.listing.findMany({
        distinct: ["category"],
        where: {
          locationValue: location.locationValue,
        },
        select: {
          category: true,
        },
      });

      return {
        locationValue: location.locationValue,
        listingsCount,
        relatedCategories: relatedCategories.map(
          (category) => category.category
        ),
        averagePrice: averagePrice._avg.price || 0,
      };
    });

    const locationInfo = await Promise.all(locationInfoPromises);

    return res.status(200).json(locationInfo || []);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting locations" });
  }
}
