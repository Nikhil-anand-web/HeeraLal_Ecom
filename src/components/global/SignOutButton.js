"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SignOutButton = ({children,className,styles}) => {
  const rtr = useRouter()
  const onClick=(e)=>{
    
    signOut({redirect: false })
    rtr.push('/wah-control-center/sign-in')
    

  }
  return (
      <button onClick={onClick} className={className} style={styles} >
      {children}
    </button>
  )
}

export default SignOutButton
