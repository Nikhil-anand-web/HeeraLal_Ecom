"use server"
import db from "@/lib/db"



export default async function getSearchedFAQ(searchTerm, itemsPerPage, pageNo) {




    try {
        if (searchTerm === '') {
            return {
                success: true,
                message: `result`,
                faqs: await db.faqs.findMany({
                    where: {
                        status:1
                  
                      },
                    orderBy: {
                        createdAt: 'desc'


                    },

                    skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                    take: parseInt(itemsPerPage) // Move take here
                })//if user increase here we can optimise


            }

        }

        const faqs = await db.faqs.findMany({
            where: {
                OR: [
                    { question: { contains: searchTerm } },
                    { answer: { contains: searchTerm } },
                   

                ]
            }

        });

















        return {
            success: true,
            message: `result`,
            faqs


        }







    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }
}
