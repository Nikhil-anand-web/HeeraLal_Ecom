"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function syncLocalCart(lcart) {
    const user = await getServerSession(authOptions)
    if (!user) {
        redirect('/sign-in')

    }
    try {
        const cartUser = await db.cart.findUnique({
            where: {
                userId: user.id
            }, select: {
                id: true
            }
        })
        if (lcart.products) {
            const varientIds = []


            for (const key in lcart.products) {
                varientIds.push(key)

            }

            const stockOfVarients = await db.varient.findMany({
                where: {
                    id: { in: varientIds } 
                },
                select: {
                    id: true, // Include the ID to map results easily
                    qty: true // Include the quantity
                }
            });
            stockOfVarients.forEach(vrt => {
                if (vrt.qty < lcart.products[vrt.id]) {
                    return {
                        success: false,
                        message: "outOfStock",
                    }


                }

            });

            const presentCartItem = await db.cartItem.findMany({
                where: {
                    AND: [{
                        cart: {
                            userId: user.id
                        }
                    }]
                }, select: {

                    varient: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            const presentcartItemids = presentCartItem.map((obj) => {
                return obj.varient.id
            })



            const dataToUpdate = Object.entries(lcart.products)
                .filter(([varientId]) => !presentcartItemids.includes(varientId)) // Filter out already-present IDs
                .map(([varientId, qty]) => ({
                    qty: qty,
                    cartId: cartUser.id,
                    varientId: varientId
                }));



 console.log(dataToUpdate)

            const createMany = await db.cartItem.createMany({
                data: dataToUpdate,
                skipDuplicates: true, // Skip 'Bobo'
                
            })
            console.log("bubvguvgyvy")


        }
        if (lcart.combos) {
            const cmbIds = []
            for (const key in lcart.combos) {
                cmbIds.push(key)

            }
            const stockOfCombo = await db.combo.findMany({
                where: {
                    id: { in: cmbIds } // Use `in` to match any of the IDs in the array
                },
                select: {
                    id: true, // Include the ID to map results easily
                    qty: true // Include the quantity
                }
            });
            stockOfCombo.forEach(cmb => {
                if (cmb.qty < lcart.combos[cmb.id]) {
                    return {
                        success: false,
                        message: "outOfStock",
                    }


                }

            });
            const presentCartCombo = await db.cartComboItems.findMany({
                where: {
                    AND: [{
                        cart: {
                            userId: user.id
                        }
                    }]
                }, select: {

                    combo: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            const presentcartComboItemids = presentCartCombo.map((obj) => {
                return obj.combo.id
            })
            const dataToUpdate = Object.entries(lcart.combos)
                .filter(([comboId]) => !presentcartComboItemids.includes(comboId)) // Filter out already-present IDs
                .map(([comboId, qty]) => ({
                    qty: qty,
                    cartId: cartUser.id,
                    comboId: comboId
                }));


            const createMany = await db.cartComboItems.createMany({
                data: dataToUpdate,
                skipDuplicates: true, // Skip 'Bobo'
            
            })
            console.log("bubvguvgyvy")



        }
        return {
            success: true,
            message: "synced",

        } 





    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            redirect('/sign-in')

        }


        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }
}