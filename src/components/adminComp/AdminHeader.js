"use client"
import Image from 'next/image'
import React from 'react'
import logo from '../../images/logo.png'


import SignOutButton from '../global/SignOutButton'
import { useSession } from 'next-auth/react'




const AdminHeader = () => {
  const { data: user } = useSession();
 

  
  const fullName = user?.fullName 
  
  var url = "/images/faces-clipart/pic-1.png"
  var alt = "alt"

  if (user && user.profilePic) {
   const obj =  JSON.parse(user.profilePic)
    url = obj?.url
    alt = obj?.alt
  
    
  }
  



   
  
  
 


  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start overflow-visible">
        <a className="navbar-brand brand-logo" href="../../index.html">
          <Image src={logo} alt='logo' height={200} width={100} />
        </a>
        <a className="navbar-brand brand-logo-mini" href="../../index.html">
          <Image src={logo} alt='logo' height={22}  width={100} />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu" />
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item d-none d-lg-block full-screen-link">
            <a className="nav-link">
              <i className="mdi mdi-fullscreen" id="fullscreen-button" />
            </a>
          </li>
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="nav-profile-img">
                <Image src={url} height={300} width={200} alt={alt} />
                <span className="availability-status online" />
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">{fullName}</p>
              </div>
            </a>
            <div
              className="dropdown-menu navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
             
              {/* <div className="dropdown-divider " /> */}
              <SignOutButton className="dropdown-item " >
                <i className="mdi mdi-logout me-2 text-primary" /> Signout{" "}
              </SignOutButton>
            </div>
          </li>


        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  )
}

export default AdminHeader
