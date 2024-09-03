"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

async function toggleProductStatus(ids) {

    console.log(ids)
    const user = await getServerSession(authOptions)

    if (user.permissions.at(0)?.productAndInventory) {
        try {
            const obj = await db.product.findUnique({
                where: {
                    id: ids,
                    AND: [{ id: ids }, {
                        category: {
                            status: 1
                        }

                    }]
                },
                select: {
                    status: true
                }
            })
            if (!obj) {
                return {
                    success: false,
                    message: "category deactivated or not exist"
                }

            }

            const updated = await db.product.update({
                where: {
                    id: ids
                },
                data: {
                    status: obj.status === true ? false : true,

                    createdBy: { connect: { id: user.id } }
                }
            })
            const varients = await db.varient.findMany({
                where: {
                    product: {
                        id: ids,
                    },
                },
            });
            console.log(varients)

            for (const varient of varients) {
               const val= await db.varient.update({
                    where: {
                        id: varient.id,
                    },
                    data: {
                        status: obj.status === true ? false : true,
                        createdBy: { connect: { id: user.id } },
                    },
                });
                console.log(val)
            }



            revalidatePath('/wah-control-center/products')

            return {
                success: true,
                message: `Varient ${updated.status === true ? "activated" : "deactivated"} Successfully`
            }



        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.meta?.cause || "internal server error"
            }

        }


    }

}

export default toggleProductStatus