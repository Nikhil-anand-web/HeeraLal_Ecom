"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function updateRecipe(formData) {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].complementaryContentManagment) {



        try {
            var updateObj = {}
            if (formData.get('name')) {
                updateObj.name = formData.get('name')


            }
            if (formData.get('videoLink')) {
                updateObj.videoLink = formData.get('videoLink')

            }
            if (formData.get('instructions')) {
                updateObj.instructions = formData.get('instructions')

            }
            if (formData.get('ingredients')) {
                updateObj.ingredients =  (!formData.get('ingredients') || formData.get('ingredients')==='')?"noExtra":formData.get('ingredients').split(',').map(str=>str.trim())

            }
            if (formData.get('brief')) {
                updateObj.brief = formData.get('brief')

            }
            const connect = []

            for (let i = 0; i < parseInt(formData.get('noOfProduct')); i++) {
                const obj = {
                    id: formData.get(`productsId${i}`)

                }
                connect.push(obj)
            }



            const updated = await db.recipe.update({
                where: {
                    id: formData.get('id')
                }, data: {
                    ...updateObj, createdBy: { connect: { id: user.id } }, products: {
                        connect: [
                            ...connect
                        ]

                    },
                }
            })




            revalidatePath('/wah-control-center/updateRecipe')
            return {
                success: true,
                message: "updated",


            }







        } catch (error) {
            console.log(error)

            return {
                success: false,
                message: error.code === 'P2002' ? "unique constrain void" : error.meta?.cause || "internal server error",

            }

        }
    }
}