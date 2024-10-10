import DangerDiv from '@/components/DangerDiv'
import React from 'react'

const page =  async() => {
    const termsOfUse = (await db.staticInfo.findFirst({
        where:{
            key:"termsOfUse"
        }
    })).value[0].data
    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <h1 className="mb-5">Terms</h1>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="terms-policy">
                            <h4 className="mb-2">Acceptance of terms</h4>
                           
                            <DangerDiv htmlEl={termsOfUse}/>
                            

                        </div>
                    </div>
                </div>


            </div>


        </section>
    )
}

export default page
