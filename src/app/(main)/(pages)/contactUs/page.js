import GetInTouchForm from '@/components/clientForm/GetInTouchForm'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const mapUrl = (await db.staticInfo.findFirst({
        where: {
          key: "mapUrl"
        }
      })).value[0].data
      const companyAddress = (await db.staticInfo.findFirst({
        where: {
          key: "companyAddress"
        }
      })).value
      const customerService = (await db.staticInfo.findFirst({
        where: {
          key: "customerService"
        }
      })).value[0].data
      const noOfWorkingDays = (await db.staticInfo.findFirst({
        where: {
          key: "noOfWorkingDays"
        }
      })).value[0].data
      const souportTime = (await db.staticInfo.findFirst({
        where: {
          key: "souportTime"
        }
      })).value[0].data
      const souportEmail = (await db.staticInfo.findFirst({
        where: {
          key: "souportEmail"
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
  return (
    <>
    <section className="product-detail-page">
        <div className="container">
           <div className="breadcrum">
            <ul className="d-flex">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/contactUs">Contact Us</Link></li>
                    </ul>
           </div>
        </div>
        
    </section>
    <section className="contact-page">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="map">
                    <iframe src={mapUrl} width="100%" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        <div className="row justify-content-between mt-3">
            <div className="col-md-3">
                <h2>CONTACTS</h2>
                <div className="address mb-2 d-flex">
                    <div className="address-left me-3">
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <div className="address-right">
                        <h3>ADDRESS</h3>
                        <p>{companyAddress[0].area+","+companyAddress[1].cityAndState+","+companyAddress[2].country}</p>
                    </div>
                </div>

                <div className="address mb-2 d-flex">
                    <div className="address-left me-3">
                        <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <div className="address-right">
                        <h3>Phone</h3>
                        <p><a href={`tel:${customerService}`}> {customerService}</a></p>
                    </div>
                </div>

                <div className="address mb-2 d-flex">
                    <div className="address-left me-3">
                        <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="address-right">
                        <h3>Hours</h3>
                        <p>{noOfWorkingDays} Days a week from {souportTime}

                          </p>
                    </div>
                </div>

                <div className="address mb-2 d-flex">
                    <div className="address-left me-3">
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="address-right">
                        <h3>EMAIL</h3>
                        <a href={`maito:${souportEmail}`}>{souportEmail}</a>
                    </div>
                </div>
            </div>
            <div className="col-md-3 get-in-touch">
                <h2>GET IN TOUCH WITH US</h2>
                <GetInTouchForm/>
            </div>
            <div className="col-md-3">
                <h2>FOLLOW US</h2>
                <div className="social-media">
                    <ul>
                        <li> <a href={facebook}><i className="fa-brands fa-facebook-f"></i> follow us on Facebook</a></li>
                        <li> <a href={twitter}><i className="fa-brands fa-twitter"></i> Join us on twitter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
</>
  )
}

export default page
