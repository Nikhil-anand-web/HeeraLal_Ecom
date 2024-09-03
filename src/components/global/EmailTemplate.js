
import React from 'react'

const EmailTemplate = ({otp}) => {
   const s1 = {width:"85%",borderColor:"#0DA487",borderStyle:"solid",borderWidth:"2px"}
  return (
    <div style={s1}>
      
        <div style={{display:"flex",marginBottom:"20px"}}>
            <img height={250}  style={{marginLeft:"33%",borderRadius:"109px"}}   src={"https://m.media-amazon.com/images/S/aplus-media-library-service-media/08b7eebd-3b94-4a16-8df7-ed837370f482.__CR0,0,970,600_PT0_SX970_V1___.jpg"}/>
        </div>
        <div style={{marginBottom:"30px"}}>
            <div style={{color:"#0DA487",fontSize:"20px"}} >
               Your OTP for email verification is :
            </div>
            <div style={{color:"#0DA487",display:"flex",marginLeft:"44%",fontSize:"50px"}}>
               {otp}
            </div>

        </div>
        <div style={{display:"flex",marginLeft:"34%"}}>
           <ul>
            <li style={{fontSize:"13px",color:"#828282"}}>
                please don't share this otp with other person or website 
            </li>
           </ul>
        </div>
        
      
    </div>
  )
}

export default EmailTemplate
