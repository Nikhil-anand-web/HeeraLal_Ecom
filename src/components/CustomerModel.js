
import React, { useState } from 'react'

import Image from 'next/image'
import axios from 'axios';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import toggleCustomerStatus from '@/app/actions/toggleCustomerStatus';


const CustomerModel = ({ firstName, lastName,email, mobile, id, urlImg = "/images/faces-clipart/pic-1.png", alt = "", status ,isMobileVerified , isEmailVerified}) => {
  const rtr = useRouter()
  

  const [isActive, setIsActive] = useState(status);
  
  const onStatusFlip= async()=>{
    try {
      const res = await toggleCustomerStatus(id)
        console.log(res)
      
      if (!res.success) {
        throw res
        
      }
      toast.success(res.message)
      setIsActive((pre)=>!pre)//  some bad practice pay att. 
      
    } catch (error) {
      console.log(error)
            
            toast.warning(error.message)
      
    }

  }

const onClick=()=>{
  rtr.push(`/wah-control-center/userDetails/${id}`)
  
}


  return (
    <div id={id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
      <div onClick={onClick} className="row g-0">
        <div className="col-4 relative top-20">
          <Image style={{borderRadius:"45px"}} alt={alt} className="" src={urlImg} width={60} height={60} layout='' />
        </div>
        <div className="col-8">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1">{firstName} {lastName}</h6>
            <p className="card-text mb-1"><small className="text-muted">{mobile} {isMobileVerified === true ? <span className="badge badge-success">{" Verified "}</span> : <span className="badge badge-danger">{" Not Verified "}</span>}</small></p>
            <p className="card-text mb-1"><small className="text-muted">{email} {isEmailVerified === true ? <span className="badge badge-success">{" Verified "}</span> : <span className="badge badge-danger">{" Not Verified "}</span>}</small></p>
          </div>
        </div>

      </div>

     
      {!isActive ?
        <button onClick={onStatusFlip} type="button"  style={{
          margin: "10px",
          background: "green",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Activate</button>
        :

        <button onClick={onStatusFlip} type="button" style={{
          margin: "10px",
          background: "yellow",
          border: "none",
          borderRadius: "inherit",
          color: "black",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Suspend</button>

      }




    </div>
  )
}

export default CustomerModel
