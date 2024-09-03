import React, { useState } from 'react'
import tempLogo from '../../../public/images/faces-clipart/pic-1.png'
import Image from 'next/image'
import axios from 'axios';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UserModal = ({ fullName, email, username, id, urlImg = tempLogo, alt = "", status ,setUsers}) => {
  const rtr = useRouter()
  
  
  const [isActive, setIsActive] = useState(status);
  
  const onStatusFlip= async()=>{
    try {
      const res = await axios.post('/api/v1/userStatusToggle',{id:id})
        console.log(res)
      
      if (res.data.success) {
        toast.success(res.data.message)
        setIsActive(res.data.userStatus)
        
      }
      
    } catch (error) {
      console.log(error)
            
            toast.warning(error.response.data.message)
      
    }

  }

const onClick=()=>{
  rtr.push(`/wah-control-center/userDetails/${id}`)
  
}


  return (
    <div id={id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
      <div onClick={onClick} className="row g-0">
        <div className="col-4 relative top-20">
          <Image alt={alt} className="" src={urlImg} />
        </div>
        <div className="col-8">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1">{fullName}</h6>
            <p className="card-text mb-1"><small className="text-muted">{username}</small></p>
            <p className="card-text mb-1"><small className="text-muted">{email}</small></p>
          </div>
        </div>

      </div>

      {/* <button onClick={onDelete} type="button" className="btn-danger" style={{
        margin: "10px",
        background: "red",
        border: "none",
        borderRadius: "inherit",
        color: "#fff",
        fontSize: "14px",
        padding: "8px 15px"
      }}>Delete</button> */}
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

export default UserModal
