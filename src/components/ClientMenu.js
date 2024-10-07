"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ClientMenu = () => {
    const url = usePathname()
    const arr = url.split('/')
    const active = arr.at(1)
  
  return (
    <>
     <li className="nav-item">
                <Link className={`nav-link  ${active==='' && 'active'}`} aria-current="page" href="/">Home</Link>
              </li>
              <li  >
                <Link className={`nav-link  ${active==='aboutUs' && 'active'}`} href="/aboutUs">Company</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${active==='products' && 'active'}`} href="/products/all">Products</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link   ${active==='bulkOrder' && 'active'}`}  href="/bulkOrder">Bulk Orders</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${active==='recipes' && 'active'}`} href="/recipes">Recipes</Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link  ${active==='blogs' && 'active'}`} href="/blogs">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${active==='faqs' && 'active'}`} href="/faqs">FAQ's</Link>
              </li>
      
    </>
  )
}

export default ClientMenu
