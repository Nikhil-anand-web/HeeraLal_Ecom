import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"

import db from "@/lib/db"
import MainModule from "../../(complementaryContentManagment)/blogs/components/MainModule"
import ArchiveModule from "./components/ArchiveModule"






const page = async ({ params }) => {
    const user = await getServerSession(authOptions)
    if (user && user.permissions[0].archives) {
        var customers = await db.user.findMany({
            include: {
                referedBy: {
                    select: {

                        mobile: true,
                        email: true,
                        firstName: true,
                        lastName: true

                    }
                },
                cart: {
                    select: {
                        cartItem: {
                            select: {
                                qty: true,
                                varient: {
                                    select: {
                                        id: true,
                                        slug: true,
                                        product: {
                                            select: {
                                                id: true,
                                                name:true
                                            }
                                        },
                                        mrp:true,
                                        weight:true,
                                        discount:true

                                    }

                                }

                            }
                        },
                        cartComboItems: {
                            select: {
                                qty: true,
                                combo: {
                                    select: {
                                        id: true,
                                        name:true,
                                        discountInPercent:true,
                                        productVarients:{
                                            select:{
                                                id: true,
                                                slug: true,
                                                product: {
                                                    select: {
                                                        id: true,
                                                        name:true
                                                    }
                                                },
                                                mrp:true,
                                                weight:true,
                                                discount:true
        

                                            }
                                        }

                                    }

                                }

                            }
                        },
                        coupon:true,
                        refralDiscountAbsolute:true

                    }

                },
                lastEditedBy:{
                    select:{
                        userName:true
                    }
                },
                referedTo:{
                    select:{
                        firstName:true,
                        email:true,
                        mobile:true,
                        lastName:true

                    }
                },
                referal:true
            }

        })
        var orders = await db.orders.findMany({})

    }





    return (
        (user && user.permissions[0].archives ? <>
            <div style={{ display: "flex", justifyContent: "center" }}> <h2>Archive Data</h2></div>


<ArchiveModule orders={orders} customers={customers} />



        </> : <p>Access Denied</p>)
    )
}

export default page
