"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const SignOut = () => {
  return (
    <li className="border-top mt-4 pt-3"><Link href={"#"} onClick={()=>{
      signOut({ callbackUrl: '/sign-in' })
    }} ><i className="fa-solid fa-right-from-bracket me-2"></i>
                            Logout</Link></li>
  )
}

export default SignOut
