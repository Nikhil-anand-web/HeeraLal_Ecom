
import DangerDiv from '@/components/DangerDiv'
import React from 'react'
export const metadata = {
    title: 'shiping-policy',
    icons: {
        icon: 'asset/favicon.ico',
    },
};
const page =  async() => {
    const shipingPolicy = (await db.staticInfo.findFirst({
        where:{
            key:"shipingPolicy"
        }
    })).value[0].data
    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <h1 className="mb-5">Shiping Policy</h1>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="terms-policy">
                           
                        <DangerDiv htmlEl={shipingPolicy}/>
                            

                        </div>
                    </div>
                </div>


            </div>


        </section>
    )
}

export default page
