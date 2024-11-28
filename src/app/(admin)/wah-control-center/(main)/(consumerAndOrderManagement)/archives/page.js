
import { getServerSession } from "next-auth"
import ArchiveModule from "./components/ArchiveModule"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"






const page = async ({ params }) => {
    



    const user = await getServerSession(authOptions)
    if (!(user && user.permissions[0].archives)) {
        return {
            success:false,
            data:null,
            message:"access denied"
        }
        
       
       

    }

    return (
        (user && user.permissions[0].archives ? <>
            <div style={{ display: "flex", justifyContent: "center" }}> <h2>Archive Data</h2></div>


            <ArchiveModule />



        </> : <p>Access Denied</p>)
    )
}

export default page
