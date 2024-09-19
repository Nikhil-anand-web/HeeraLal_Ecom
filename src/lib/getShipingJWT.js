import axios from "axios";




  export default async function getShipingJWT() {
    const clientId = process.env.SHIPING_CLIENT_ID
    const clientSecret = process.env.SHIPING_CLIENT_SECRET
    const baseUrl = process.env.SHIPING_BASE_URL
    try {
        const options = {
            method: 'GET',
          
            url: `${baseUrl}/transportation/token/v1/login`,
            headers: {ClientID: clientId, clientSecret: clientSecret}
          };
          
        const res =await  axios.request(options)
        // console.log(res)
       
        return {
            success:true,
            message:"s_auth  success",
            jwt :res.data.JWTToken
        }
        
    
        
    } catch (error) {
        console.log(error)
        return{
            success:false,
            message:"s_auth failed",
            res:null

        }
        
    }
    
    
  }