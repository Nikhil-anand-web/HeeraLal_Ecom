"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


async function makeAVarientDefault(ids) {

    console.log(ids)
    const user = await getServerSession(authOptions)

    if (user.permissions.at(0)?.productAndInventory) {
        try {

            const varientOfProduct = await db.varient.findFirst({

                where: {
                    id: ids
                }, select: {
                    productId: true
                }

            })
            console.log(varientOfProduct)


            const preDef = await db.varient.findFirst({
                where: {

                    AND: [{ isDefault: true }, { productId: varientOfProduct.productId }]
                }
            })
            if (preDef) {
                console.log(preDef, "predef")

                await db.varient.update({
                    where: {
                        id: preDef.id
                    },
                    data: {
                        isDefault: false
                    }
                })

            }

            const updated = await db.varient.update({
                where: {
                    id: ids
                },
                data: {
                    isDefault: true,
                    status: true,
                    createdBy: { connect: { id: user.id } }
                }
            })
       console.log(updated)


            return {
                success: true,
                message: ` ${updated.slug} is now default`
            }



        } catch (error) {
            console.log(error)
            return ({
                success: false,
                message: error.meta?.cause || "internal server error"
            })

        }


    }

}

export default makeAVarientDefault