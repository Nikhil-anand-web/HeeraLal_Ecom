import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section class="product-detail-page">
        <div class="container">
           <div class="breadcrum">
            <ul class="d-flex">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/contactUs">Contact Us</Link></li>
                    </ul>
           </div>
        </div>
        
    </section>
    <section class="contact-page">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d457247.9947806852!2d80.00873703256529!3d26.447670587831674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c475b40dc8cc3%3A0xb94ce421774d7246!2sHeeral%20Wah%20India%20Spices!5e0!3m2!1sen!2sin!4v1719146930145!5m2!1sen!2sin" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        <div class="row justify-content-between mt-3">
            <div class="col-md-3">
                <h2>CONTACTS</h2>
                <div class="address mb-2 d-flex">
                    <div class="address-left me-3">
                        <i class="fa-solid fa-house"></i>
                    </div>
                    <div class="address-right">
                        <h3>ADDRESS</h3>
                        <p>15/240- I, Civil Lines, Kanpur, India, Uttar Pradesh</p>
                    </div>
                </div>

                <div class="address mb-2 d-flex">
                    <div class="address-left me-3">
                        <i class="fa-solid fa-phone-volume"></i>
                    </div>
                    <div class="address-right">
                        <h3>Phone</h3>
                        <p><a href="tel:+91 96519 22897"> +91 96519 22897</a></p>
                    </div>
                </div>

                <div class="address mb-2 d-flex">
                    <div class="address-left me-3">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <div class="address-right">
                        <h3>Hours</h3>
                        <p>7 Days a week from 10:00 am to 6:00 pmt

                          </p>
                    </div>
                </div>

                <div class="address mb-2 d-flex">
                    <div class="address-left me-3">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="address-right">
                        <h3>EMAIL</h3>
                        <a href="">support@heelwahindia.com</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 get-in-touch">
                <h2>GET IN TOUCH WITH US</h2>
                <form action="">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Name"/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Email"/>
                    </div>

                    <div class="form-group">
                        <textarea class="form-control" placeholder="Message"></textarea>
                    </div>
                    <div class="formbuttton">
                        <button type="submit" class="btn">Submit</button>
                    </div>

                   
                </form>
            </div>
            <div class="col-md-3">
                <h2>FOLLOW US</h2>
                <div class="social-media">
                    <ul>
                        <li> <a href="#"><i class="fa-brands fa-facebook-f"></i> follow us on Facebook</a></li>
                        <li> <a href="#"><i class="fa-brands fa-twitter"></i> Join us on twitter</a></li>
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
