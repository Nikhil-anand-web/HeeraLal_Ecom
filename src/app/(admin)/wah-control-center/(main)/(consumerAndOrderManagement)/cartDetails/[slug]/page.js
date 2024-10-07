import { getServerSession } from "next-auth"
import MainModule from "../components/MainModule"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"


const page = async ({ params }) => {
    const cartId = params.slug
    const user = await getServerSession(authOptions)
    if (user.permissions[0].consumerAndOrderManagement) {
        var crt = await db.cart.findUnique({
            where: {
                id: cartId
            },
            select: {
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

        })
    }
    return (
        <MainModule cart={crt} />

    )
}

export default page
