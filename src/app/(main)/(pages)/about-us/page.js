import React from 'react'


import Image from 'next/image'
const page = async() => {
    const ourMission = (await db.staticInfo.findFirst({
        where:{
            key:"ourMission"
        }
    })).value[0].data
    const ourStories = (await db.staticInfo.findFirst({
        where:{
            key:"ourStories"
        }
    })).value[0].data
    const ourApproach = (await db.staticInfo.findFirst({
        where:{
            key:"ourApproach"
        }
    })).value[0].data
    const ourPhilosophy = (await db.staticInfo.findFirst({
        where:{
            key:"ourApproach"
        }
    })).value[0].data
    const smallFactAboutMasala = (await db.staticInfo.findFirst({
        where:{
            key:"smallFactAboutMasala"
        }
    })).value[0].data
    const banner = (await db.banners.findFirst({
        where:{
            AND:[{pageSlug:"aboutUs"},{displayOrder:0}]


        }
    }))
    

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
                <p>{ourMission}</p>

            </div>

            <div className="col-md-6">
                <h5>OUR STORIES</h5>
                <p>{ourStories}</p>
                
            </div>

            <div className="col-md-6 mt-2">
                <h5>OUR APPROACH</h5>
                <p>{ourApproach}</p>
                
            </div>

            <div className="col-md-6 mt-2">
                <h5>OUR PHILOSOPHY</h5>
                <p>{ourPhilosophy}</p>
                
            </div>
        </div>

        <div className="row mt-5 align-items-center aboutbox">
            <div className="col-md-6">
               
                <Image src={banner.images[0].url} layout='responsive'width={18} height={9} className="img-fluid" alt=""/>
            </div>
            <div className="col-md-6">
                <h3>Small Facts About Masala</h3>
                <p>{smallFactAboutMasala}</p>
            </div>
        </div>
     
    
       
        </div>
  
 
  </section>
  )
}

export default page