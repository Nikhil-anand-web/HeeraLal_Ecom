import React from 'react'
import p1 from "../../../../images/p1.webp"
import p2 from "../../../../images/p2.webp"
import p3 from "../../../../images/p3.webp"
import p4 from "../../../../images/p4.webp"
import ProductBulk from './_components/ProductBulk'
const page = async () => {
    const product = await db.product.findMany({
        where:{
           AND:[{ varient:{
                some:{
                    isBulk:true
                }
            }},{status:true}]
        },select:{
            name:true,
            thumbNail:true,
            stars:true,
            varient:{
               where:{
                AND:[{isBulk:true},{status:true}]
               },select:{
                id:true,
                mrp:true,
                discount:true,
                weight:true,
                slug:true,
                isBulk:true
               }
                
            }

        }
    })
    
    
    return (
        <section class="product-page">
            <div class="container">
                <div class="row">
                   
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <h1 class="mb-5">Bulk Order Products</h1>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6"></div>
                            <div class="col-md-6"></div>
                        </div>

                        <div class="row m-0">
                            {product.map((obj)=> <ProductBulk imageS={obj.thumbNail[0].url} procuctName={obj.name} varients={obj.varient} stars = {obj.stars}/>)}
                            

                           {/* <ProductBulk imageS={p3} procuctName={"pav masala"} Price={500} stars = {7}/>
                           <ProductBulk imageS={p1} procuctName={"pav masala"} Price={500} stars={8}/>
                           <ProductBulk imageS={p2} procuctName={"pav masala"} Price={500}/>
                           <ProductBulk imageS={p4} procuctName={"pav masala"} Price={500}/>
                           <ProductBulk imageS={p1} procuctName={"pav masala"} Price={500}/>
                           <ProductBulk imageS={p2} procuctName={"pav masala"} Price={500}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
