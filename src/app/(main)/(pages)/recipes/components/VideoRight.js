import DangerDiv from '@/components/DangerDiv'
import Link from 'next/link'
import React from 'react'

const VideoRight = ({ recipe }) => {
    
   
    return (
        <div className="row  my-5">
            <div className="col-md-7 col-12 order-2 order-md-1">
                <Link href={`/recipe-details/${recipe.id}`}><h2>{recipe.name}</h2></Link>
                <hr />

               
                {/* <div style={{ marginTop: "20px" }}>
                    <h4 className="social-list" style={{ textDecoration: "underline" }}>Ingridents:-</h4>

                    <div style={{ display: "flex" }} className="social-list">
                        {recipe.ingredients}


                    </div>

                </div> */}

                {/* <div style={{ marginTop: "20px" }}>
                    <h4 className="social-list" style={{ textDecoration: "underline" }}>Our Product:-</h4>
                    <div style={{ display: "flex" }} className="social-list">
                        {recipe.products.map((obj, i) => <Link href={`/product-details/${obj.slug}`}>


                            {obj.name} {(i < recipe.products.length - 1) ? "," : ""}

                        </Link>)}


                    </div>
                </div> */}
                <div style={{ marginTop: "20px" }}>
                
                    <div style={{ display: "flex" }} className="social-list">
                        <DangerDiv htmlEl={recipe.brief}/>


                    </div>
                </div>


            </div>
            <div className="col-md-5 col-12 order-1 order-md-2">
                <iframe width="100%" height="315" src={recipe.videoLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>            </div>

        </div>
    )
}

export default VideoRight
