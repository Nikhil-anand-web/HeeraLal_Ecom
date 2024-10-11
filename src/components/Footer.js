import Image from 'next/image'
import React from 'react'
import highQualityImg from '../images/high-quality.png'
import dilivaryImg from '../images/dilivary.png'
import discountImg from '../images/discount.png'
import showRoomImg from '../images/showroom.png'
import footerLogo from '../images/footer-logo.png'
import paymentImg from "../images/payments.png"
import Link from 'next/link'
import db from '@/lib/db'
import DangerDiv from './DangerDiv'
const Footer = async () => {
  const ftrlogo = await db.banners.findFirst({
    where: {

      AND: [{ pageSlug: "footer" }, { displayOrder: 0 }]
    }
  })
  const youtubeLink = (await db.staticInfo.findFirst({
    where: {
      key: "youtube"
    }
  })).value[0].data
  const facebook = (await db.staticInfo.findFirst({
    where: {
      key: "faceBook"
    }
  })).value[0].data
  const twitter = (await db.staticInfo.findFirst({
    where: {
      key: "twitter"
    }
  })).value[0].data
  const insta = (await db.staticInfo.findFirst({
    where: {
      key: "instagram"
    }
  })).value[0].data
  const footerPara = (await db.staticInfo.findFirst({
    where: {
      key: "footerParaGraph"
    }
  })).value[0].data
  const customerService = (await db.staticInfo.findFirst({
    where: {
      key: "customerService"
    }
  })).value[0].data
  const souportEmail = (await db.staticInfo.findFirst({
    where: {
      key: "souportEmail"
    }
  })).value[0].data
  const souportTime = (await db.staticInfo.findFirst({
    where: {
      key: "souportTime"
    }
  })).value[0].data
  const companyAddress = (await db.staticInfo.findFirst({
    where: {
      key: "companyAddress"
    }
  })).value
 
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top justify-content-center align-items-center row ps-lg-3">
          <div className="col-md-3">
            <div className="quality d-flex align-items-center">
              <div className="quality-img me-3">

                <Image alt='logo' layout='responsive' src={highQualityImg} />
              </div>
              <div className="quality-txt">Every Quality Products</div>

            </div>

          </div>

          <div className="col-md-3">
            <div className="quality d-flex align-items-center">
              <div className="quality-img me-3">   <Image alt='logo' layout='responsive' src={dilivaryImg} /></div>
              <div className="quality-txt">Free Delivery for Order Over ₹50</div>

            </div>

          </div>

          <div className="col-md-3">
            <div className="quality d-flex align-items-center">
              <div className="quality-img me-3">   <Image alt='logo' layout='responsive' src={discountImg} /></div>
              <div className="quality-txt">Daily Mega Discounts</div>

            </div>

          </div>

          <div className="col-md-3">
            <div className="quality d-flex align-items-center">
              <div className="quality-img me-3">   <Image alt='logo' layout='responsive' src={showRoomImg} /></div>
              <div className="quality-txt">Best Prime on the market</div>

            </div>

          </div>

        </div>

        <div className="footer-md row pt-3">
          <div className="col-lg-3 ">
            <div className="footer-left">
              <div className="footer-img mb-4">
                <Image alt='logo' width={120} height={60} src={ftrlogo.images[0].url} />
              </div>
              <div className="footer-content">
                <DangerDiv htmlEl={footerPara}/>
                <a href="/about-us" className="primary-color">Read more</a>
                <div className="social-media mt-2">
                  <ul className="d-flex">
                    <li><Link href={facebook}><i className="fa-brands fa-facebook-f"></i></Link></li>
                    <li><Link href={twitter}><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link href={insta}><i className="fa-brands fa-square-instagram"></i></Link></li>
                    <li><Link href={youtubeLink}><i className="fa-brands fa-youtube"></i></Link></li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {/* <div className="col-lg-2 col-md-5">
              <div className="footer-link">
                <h4>Products</h4>
                <ul>
                  <li><Link href="/products"><i className="fa-solid fa-angle-right"></i> Complete Masala</Link></li>
                  <li><Link href="/products"><i className="fa-solid fa-angle-right"></i> Blended Masala</Link></li>
                  <li><Link href="/products"><i className="fa-solid fa-angle-right"></i> Regular Masala</Link></li>
                  <li><Link href="/products"><i className="fa-solid fa-angle-right"></i> Others</Link></li>
                  <li> <Link  href="/bulkOrder"><i className="fa-solid fa-angle-right"></i> Bulk Orders</Link></li>
                  <li> <Link  href="/bulkOrder"><i className="fa-solid fa-angle-right"></i> Bulk Orders</Link></li>
                  
                 
                </ul>
              </div>
            </div> */}

              <div className="col-lg-3  col-md-6">
                <div className="footer-link">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><Link href="/"><i className="fa-solid fa-angle-right"></i> Home</Link></li>
                    <li><Link href="/about-us"><i className="fa-solid fa-angle-right"></i> About Us</Link></li>
                    <li><Link href="/recipes"><i className="fa-solid fa-angle-right"></i> Recipes</Link></li>
                    <li><Link href="/blogs"><i className="fa-solid fa-angle-right"></i> Blogs</Link></li>
                    <li><Link href="/contact-us"><i className="fa-solid fa-angle-right"></i> Contact Us</Link></li>

                  </ul>
                </div>
              </div>

              <div className="col-lg-3  col-md-6">
                <div className="footer-link">
                  <h4>Legal</h4>
                  <ul>
                    <li><Link href="/terms"><i className="fa-solid fa-angle-right"></i> Terms Of Use </Link></li>
                    <li><Link href="/disclamer"><i className="fa-solid fa-angle-right"></i> Disclaimer</Link></li>
                    <li><Link href="/privacy-policy"><i className="fa-solid fa-angle-right"></i> Privacy Policy</Link></li>
                    <li><Link href="/shiping-policy"><i className="fa-solid fa-angle-right"></i> Shipping Policy</Link></li>
                    <li><Link href="/refund-policy"><i className="fa-solid fa-angle-right"></i> Refund Policy</Link></li>

                  </ul>
                </div>
              </div>

              <div className="col-lg-4  col-md-5">
                <div className="footer-link">
                  <h4>Contact Us</h4>
                  <div className="contact d-flex mb-3">
                    <div className="contact-icons me-2"><i className="fa-solid fa-house"></i></div>
                    <div className="contact-text">{companyAddress[0].area+","+companyAddress[1].cityAndState+","+companyAddress[2].country}</div>
                  </div>

                  <div className="contact d-flex mb-3">
                    <div className="contact-icons me-2"><i className="fa-solid fa-phone"></i></div>
                    <div className="contact-text"><a href={`tel:${customerService}`}>{customerService} </a></div>
                  </div>
                  <div className="contact d-flex mb-3">
                    <div className="contact-icons me-2"><i className="fa-solid fa-clock"></i></div>
                    <div className="contact-text">{souportTime}</div>
                  </div>
                  <div className="contact d-flex mb-3">
                    <div className="contact-icons me-2"><i className="fa-solid fa-envelope"></i></div>
                    <div className="contact-text"><a href={`maito:${souportEmail}`}>{souportEmail}</a></div>
                  </div>
                  <div className="payment">
                    <Image layout='responsive' src={paymentImg} alt='logo' />
                  </div>


                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="row copywrite">
          <div className="col-md-12 text-center">
            <p>Wah India All right reserved 2024</p>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer
