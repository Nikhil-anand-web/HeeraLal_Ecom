"use server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const cartSelect = {
  id: true,
  user: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
    },
  },
  cartItem: {
    select: {
      varient: {
        select: {
          id: true,
          weight: true,
          product: {
            select: {
              name: true,
              thumbNail: true,
            },
          },
          mrp: true,
          discount: true,
        },
      },
      qty: true,
    },
  },
  coupon: {
    select: {
      code: true,
      discountValue: true,
      status: true,
      minOrderValue: true,
      type: true,
    },
  },
  refralDiscountAbsolute: true,
  cartComboItems: {
    select: {
      qty: true,
      combo: {
        select: {
          id: true,
          name: true,
          discountInPercent: true,
          productVarients: {
            select: {
              product: {
                select: {
                  thumbNail: true,
                },
              },
              mrp: true,
              weight: true,
            },
          },
        },
      },
    },
  },
};

export default async function getSearchedCarts(searchTerm, itemsPerPage, pageNo, dateRange) {
  const user = await getServerSession(authOptions);

  if (user.permissions[0].consumerAndOrderManagement) {
    try {
      const commonWhereClause = {
        AND: [
          {
            OR: [
              {
                cartItem: {
                  some: {
                    updatedAt: {
                      lte: dateRange, // Filter by updatedAt of cartItem
                    },
                  },
                },
              },
              {
                cartComboItems: {
                  some: {
                    updatedAt: {
                      lte: dateRange, // Filter by updatedAt of cartComboItems
                    },
                  },
                },
              },
            ],
          },
        ],
      };

      const baseWhereClause = searchTerm === '' ? commonWhereClause : {
        AND: [
          {
            OR: [
              { user: { email: { contains: searchTerm } } },
              { user: { mobile: { contains: searchTerm } } },
              { user: { firstName: { contains: searchTerm } } },
              { user: { lastName: { contains: searchTerm } } },
            ],
          },
          commonWhereClause,
        ],
      };

      const carts = await db.cart.findMany({
        where: baseWhereClause,
        select: cartSelect,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage),
        take: parseInt(itemsPerPage),
      });

      return {
        success: true,
        message: "result",
        carts,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: error.meta?.cause || "Internal server error",
      };
    }
  }

  return {
    success: false,
    message: "Unauthorized access",
  };
}
