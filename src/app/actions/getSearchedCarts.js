"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedCarts(searchTerm, itemsPerPage, pageNo, dateRange) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].consumerAndOrderManagement) {



        try {
            if (searchTerm === '') {

                return {
                    success: true,
                    message: `result`,
                    carts: await db.cart.findMany({
                        where: {
                            AND: [{
                                OR: [
                                    {
                                        cartItem: {
                                            some: {}  // This checks if there is at least one item in `cartItem`
                                        }
                                    },
                                    {
                                        cartComboItems: {
                                            some: {}  // This checks if there is at least one item in `cartComboItems`
                                        }
                                    }
                                ]
                            }, {
                                updatedAt: {
                                    lte: dateRange, // Less than or equal to 15 days ago
                                },
                            }]
                        },
                        select: {
                            id: true,
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    mobile: true
                                }

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
                                                    thumbNail: true

                                                }


                                            },
                                            mrp: true,
                                            discount: true

                                        }

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
                                    type: true
                                }
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
                                            name: true,

                                            productVarients: {
                                                select: {
                                                    product: {
                                                        select: {

                                                            thumbNail: true

                                                        }

                                                    },
                                                    mrp: true,
                                                    weight: true,

                                                }
                                            }

                                        }

                                    }

                                }


                            }
                        },




                        orderBy: {
                            createdAt: 'desc'


                        },

                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
                    })//if user increase here we can optimise


                }

            }

            const carts = await db.cart.findMany({
                where: {
                  AND: [
                    {
                      OR: [
                        { user: { email: { contains: searchTerm } } },
                        { user: { mobile: { contains: searchTerm } } },
                        { user: { firstName: { contains: searchTerm } } },
                        { user: { lastName: { contains: searchTerm } } },
                      ]
                    },
                    {
                      updatedAt: {
                        lte: dateRange, // Less than or equal to 15 days ago
                      }
                    },
                    {
                      OR: [
                        {
                          cartItem: {
                            some: {} // Checks if there is at least one item in `cartItem`
                          }
                        },
                        {
                          cartComboItems: {
                            some: {} // Checks if there is at least one item in `cartComboItems`
                          }
                        }
                      ]
                    }
                  ]
                },
                select: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                      email: true,
                      mobile: true,
                    }
                  },
                  cartItem: {
                    select: {
                      id: true,
                      varient: {
                        select: {
                          id: true,
                          weight: true,
                          product: {
                            select: {
                              name: true,
                              thumbNail: true
                            }
                          },
                          mrp: true,
                          discount: true
                        }
                      },
                      qty: true,
                    }
                  },
                  coupon: {
                    select: {
                      code: true,
                      discountValue: true,
                      status: true,
                      minOrderValue: true,
                      type: true
                    }
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
                                  thumbNail: true
                                }
                              },
                              mrp: true,
                              weight: true,
                            }
                          }
                        }
                      }
                    }
                  }
                }
              });
              
















            return {
                success: true,
                message: `result`,
                carts


            }







        } catch (error) {
            console.log(error)

            return {
                success: false,
                message: error.meta?.cause || "internal server error",

            }

        }
    }
}