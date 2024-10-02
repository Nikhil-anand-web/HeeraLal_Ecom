import React from 'react'
import Image from "next/image";

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import CartCount from './global/CartCount';
import CustomSearchBar from './CustomSearchBar';
import CustomSearchButton from './CustomSearchButton';
import ShareTheSiteButton from './ShareTheSiteButton';
import CoinThumbnail from './CoinThumbnail';
import { headers } from 'next/headers';
import ClientMenu from './ClientMenu';
import db from '@/lib/db';



const Header = async (props) => {

  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  const user = await getServerSession(authOptions)
  var referal = null
  if (user) {
    referal = await db.referal.findUnique({
      where: {
        userId: user?.id

      }, select: {
        coins: true
      }
    })

  }
  const logo = await db.banners.findFirst({
    where: {


      AND: [{ pageSlug: 'root' }, { displayOrder: 0 }]

    }
  })
  console.log(logo)

  return (
    <header className="sticky-top shadow">

      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container navigation">
          <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span  className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" href="/">

            <Image layout='responsive' height={71} width={150} src={logo.images[0].url} alt='logo' />
          </Link>
          <div className="icons-group d-block d-lg-none">
            <ul className="d-flex">
              <li>
                <CustomSearchButton />

              </li>
              <li>
                <Link href="/account/dashboard"></Link> <Link href="/account/dashboard">{user?.googleProfilePic ? <Image style={{ borderRadius: "60px", height: "50px", width: "50px" }} src={user?.googleProfilePic} alt={"pic"} height={100} width={100} /> : <i className="fa-solid fa-user"></i>}</Link>
              </li>
              <li className="shopping-cart"><Link href="/cart">
                <span className="number"><CartCount /></span>
                <i className="fa-solid fa-bag-shopping"></i></Link></li>
            </ul>




          </div>
          <ShareTheSiteButton style={{ borderRadius: "21px", marginLeft: "15px" }} className="btn btn-success">Share</ShareTheSiteButton>



          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <ClientMenu />


              <CustomSearchBar />


              <li className="userlink d-none  d-lg-block">
                <Link href="/account/dashboard"></Link> <Link href="/account/dashboard">{user?.googleProfilePic ? <Image style={{ borderRadius: "60px" }} src={user?.googleProfilePic} alt={"pic"} height={50} width={50} /> : <i className="fa-solid fa-user"></i>}</Link>
              </li>
              <li className="shopping-cart d-none d-lg-block">
                <Link href="/cart">
                  <span className="number" name={"cntdis"}><CartCount /></span>
                  <i className="fa-solid fa-bag-shopping"></i></Link>
              </li>
              {/* <li className="nav-item">
                <ShareTheSiteButton style={{ borderRadius: "21px" }} className="btn btn-success">Refer</ShareTheSiteButton>
              </li> */}
              {referal && <li className="nav-item">
                <CoinThumbnail coins={referal.coins} />
              </li>}



            </ul>


          </div>
        </div>
      </nav>

    </header>
  )
}

export default Header
