"use client"
import { useSession } from 'next-auth/react';

import React from 'react'
import { toast } from 'react-toastify';

const ShareTheSiteButton = ({style,children,className}) => {
    const user = useSession().data
    
    
    const handleCopy = () => {
      if (!user || user.role===1 || user.role===2) {
        toast.warning("please login")
        return

        
      }
      console.log(user)
        const textToCopy = window.location.origin+`/refer/${user.id}`; // Replace with any text you want to copy

    
        navigator.clipboard.writeText(textToCopy)
          
          .catch((err) => {
            console.error('Failed to copy: ', err);
          });
          toast.success("link copied to clipboard")
      };
  return (
    <button onClick={handleCopy}  type="button" style={style} className={className}>{children}</button>
  )
}

export default ShareTheSiteButton
