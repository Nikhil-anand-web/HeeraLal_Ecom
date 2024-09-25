"use server"
const filePath = path.join(process.cwd(), 'public', 'files', 'sample.pdf');






import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedOrders(searchTerm, itemsPerPage, pageNo) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].consumerAndOrderManagement) {



        try {
       
                // Read the PDF file
                const fileBuffer = fs.readFileSync(filePath);
            
               
                return new NextResponse(fileBuffer, {
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'inline; filename="sample.pdf"', // This will allow inline view
                    },
                });
           
















            return {
                success: true,
                message: `result`,
                orders


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