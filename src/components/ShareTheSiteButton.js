"use client"
import { useSession } from 'next-auth/react';

import React from 'react'
import { toast } from 'react-toastify';

const ShareTheSiteButton = ({style,children,className}) => {
    const user = useSession()
    console.log(user)
    
    const handleCopy = () => {
        const textToCopy = window.location.origin+`/refer/${user.data.id}`; // Replace with any text you want to copy
    
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
