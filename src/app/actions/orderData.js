'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function orderData() {
    const user = await getServerSession(authOptions)
    if (!(user && user.permissions[0].archives)) {
        return {
            success:false,
            data:null,
            message:"access denied"
        }
        
       
       

    }
    try {
        var orders = await db.orders.findMany({})
        return {
            success:true,
            data:orders,
            message:"success"
        }
        
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:"something went wrong",
             message:"something went wrong"
        }
        
    }
    
    

    
}