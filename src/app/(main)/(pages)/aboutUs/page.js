import React from 'react'
import abo from "../../../../images/abo-1.webp"
import mem from "../../../../images/mem-02.webp"
import Image from 'next/image'
const page = () => {
  return (
    <section className="login-page">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <h1 className="mb-5">About Us</h1>
               
            </div>
        </div>
        <div className="row aboutbox">
            <div className="col-md-6">
                <h5>OUR MISSION</h5>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.</p>

            </div>

            <div className="col-md-6">
                <h5>OUR STORIES</h5>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.</p>
                
            </div>

            <div className="col-md-6 mt-2">
                <h5>OUR APPROACH</h5>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.</p>
                
            </div>

            <div className="col-md-6 mt-2">
                <h5>OUR PHILOSOPHY</h5>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.</p>
                
            </div>
        </div>

        <div className="row mt-5 align-items-center aboutbox">
            <div className="col-md-6">
               
                <Image src={abo} className="img-fluid" alt=""/>
            </div>
            <div className="col-md-6">
                <h3>The Richest Masala In The World</h3>
                <p>Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat</p>
                <p>Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat</p>
            </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <div className="col-md-7 text-center">
                <h3>Our Team</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.</p>
                
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-lg-3 col-md-6">
                <a href="#">
                
                <Image src={mem} className="img-fluid" alt=""/>
            <div className="teamdetails mt-3">
                <h6>Team title</h6>
                <p>omnis iste natus error sit voluptatem accusantium doloremque laudantium, </p>
            </div>
            </a>
            </div>
            <div className="col-lg-3 col-md-6">
                <a href="#">
                <Image src={mem} className="img-fluid" alt=""/>
            <div className="teamdetails mt-3">
                <h6>Team title</h6>
                <p>omnis iste natus error sit voluptatem accusantium doloremque laudantium, </p>
            </div>
            </a>
            </div>
            <div className="col-lg-3 col-md-6">
                <a href="#">
                <Image src={mem} className="img-fluid" alt=""/>
            <div className="teamdetails mt-3">
                <h6>Team title</h6>
                <p>omnis iste natus error sit voluptatem accusantium doloremque laudantium, </p>
            </div>
            </a>
            </div>
            <div className="col-lg-3 col-md-6">
                <a href="#">
                <Image src={mem} className="img-fluid" alt=""/>
            <div className="teamdetails mt-3">
                <h6>Team title</h6>
                <p>omnis iste natus error sit voluptatem accusantium doloremque laudantium, </p>
            </div>
            </a>
            </div>
        </div>
    
       
        </div>
  
 
  </section>
  )
}

export default page
