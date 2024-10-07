
import React from 'react'

const page =  async() => {
    const privacyPolicy = (await db.staticInfo.findFirst({
        where:{
            key:"privacyPolicy"
        }
    })).value[0].data
    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <h1 className="mb-5">Privacy Policy</h1>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="terms-policy">
                           
                            <p>{privacyPolicy}</p>
                            

                        </div>
                    </div>
                </div>


            </div>


        </section>
    )
}

export default page
