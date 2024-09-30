


export async function POST(req) {

    const reqObj = await req.json()







    try {
        console.log(reqObj)

       

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: error.meta?.cause || "internal server error"
        }, { status: 500 })






    }




}
