import DangerDiv from '@/components/DangerDiv'
import Link from 'next/link'
import React from 'react'

const VideoLeft = ({ recipe }) => {

    return (
        <div className={"d-flex"}>
            <div className="col-md-5 col-12 order-1 order-md-1"> {/* Video Div */}
                <iframe width="100%" height="315" src={recipe.videoLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div style={{marginLeft:"30px"}} className="col-md-7 col-12 order-2 order-md-2"> {/* Content Div */}
                <h2>{recipe.name}</h2>
                <hr />
                
                <div style={{ marginTop: "20px" }}>
                    <h4 className="social-list" style={{ textDecoration: "underline" }}>Ingredients:</h4>
                    <div style={{ display: "flex" }} className="social-list">
                        {recipe.ingredients.map((name, i) => `${name} ${(i < recipe.ingredients.length - 1) ? "," : ""}`)}
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h4 className="social-list" style={{ textDecoration: "underline" }}>Our Product:</h4>
                    <div style={{ display: "flex" }} className="social-list">
                        {recipe.products.map((obj, i) => (
                            <Link key={obj.slug} href={`/product-details/${obj.slug}`}>
                                {obj.name} {(i < recipe.products.length - 1) ? "," : ""}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VideoLeft
