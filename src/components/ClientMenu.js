"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ClientMenu = ({productWithMaxPriroty}) => {
    const url = usePathname()
    const arr = url.split('/')
    const active = arr.at(1)
  
  return (
    <>
     <li className="nav-item">
                <Link className={`nav-link  ${active==='' && 'active'}`} aria-current="page" href="/">Home</Link>
              </li>
              <li  >
                <a  className={`nav-link  ${active==='about-us' && 'active'}`} href="/about-us">Company</a>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${(active==='products' || active==="categories") && 'active'}`} href={`/products/${productWithMaxPriroty}`}>Products</Link>
              </li>
              {/* <li className="nav-item">
                <Link className={`nav-link   ${active==='bulk-order' && 'active'}`}  href="/bulk-order">Bulk Orders</Link>
              </li> */}
              <li className="nav-item">
                <Link className={`nav-link  ${active==='recipes' && 'active'}`} href="/recipes">Recipes</Link>
              </li>

              {/* <li className="nav-item">
                <Link className={`nav-link  ${active==='blogs' && 'active'}`} href="/blogs">Blog</Link>
              </li> */}
              <li className="nav-item">
                <Link className={`nav-link  ${active==='faqs' && 'active'}`} href="/faqs">FAQ's</Link>
              </li>
      
    </>
  )
}

export default ClientMenu
