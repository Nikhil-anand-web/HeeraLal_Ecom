

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CarouselComp = ({ images }) => {
  
  return (
    <section className="slider">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <Link href={!image.link?'#':image.link}>
                <Image 
                  src={image.url} 
                  className="img-fluid" 
                  height={720} 
                  width={1920} 
                  alt={image.alt || 'carousel image'} 
                  
                />
              </Link>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span style={{backgroundColor:"black" , opacity:"1",borderRadius:"50%"}} className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span style={{backgroundColor:"black" , opacity:"1",borderRadius:"50%"}} className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  )
}

export default CarouselComp
