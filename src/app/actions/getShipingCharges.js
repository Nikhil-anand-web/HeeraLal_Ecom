"use server"
export default async function getShipingCharges(pincode) {

    const ptos = pincode.toString()
    console.log(ptos)

    if (ptos!=="841301") {
        return {
            success:true,
    
            message :"fetch success",
            charges :2
        };

        
    }else if (ptos==='' || !ptos) {
        return {
            success:true,
    
            message :"fetch success",
            charges :0
        };
        
    }
    return {
        success:true,

        message :"fetch success",
        charges :1
    };
    
}