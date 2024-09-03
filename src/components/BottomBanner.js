import Image from 'next/image'
import React from 'react'

const BottomBanner = ({imageS}) => {
  return (
    <div className="row">
    <div className="col-md-12">
      <Image layout='responsive' src={imageS} className="img-fluid" alt="..." />
    </div>
  </div>
  )
}

export default BottomBanner
