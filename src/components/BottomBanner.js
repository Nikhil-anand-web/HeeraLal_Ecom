import Image from 'next/image'
import React from 'react'

const BottomBanner = ({imageS}) => {
  return (
    <div className="row">
    <div className="col-md-12">
      <Image layout='responsive' src={imageS} height={9} width={18} className="img-fluid" alt="..." />
    </div>
  </div>
  )
}

export default BottomBanner
