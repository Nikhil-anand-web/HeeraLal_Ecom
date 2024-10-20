import Image from 'next/image'
import React from 'react'
import logo from '../images/logo1.png'


const Loading = () => {
  return (
    <div className={"container7"}>
      <div className={"brandLogo"}>
        <Image 
          width={150} 
          src={logo} 
          alt="logo" 
          className={"heartbeat"} // Apply heartbeat animation
        />
      </div>
    </div>
  )
}

export default Loading
