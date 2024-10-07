import ComboThumbnailCart from '@/components/ComboThumbnailCart'
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import calculateFinalPriceOfComboAndThumbnailArray from '@/lib/calculateFinalPriceOfComboAndThumbnailArray'
import percentOf from '@/lib/percentOf'
import Image from 'next/image'
import React from 'react'

const MainModule = async ({cart}) => {
    var total = 0
    var total = 0;
    var absoluteCouponDiscount = 0

    function applyCoupon() {

        if (cart.coupon) {
            if (cart.coupon.type === 'absolute') {
                absoluteCouponDiscount = parseFloat(cart.coupon.discountValue)

            } else if (cart.coupon.type === 'percent') {
                const val = percentOf(total, parseFloat(cart.coupon.discountValue))
                console.log(val, "val")
                absoluteCouponDiscount = val


            }

        }

    }
    const tax = await db.globalSettings.findFirst({
        where: {
            settingName: "gstRate"
        }
    })
    var taxAmount = 0
    function applyTaxes() {
        var abs = percentOf((total - absoluteCouponDiscount - cart.refralDiscountAbsolute), tax.value)
        taxAmount = abs


    }
   
   
   
    if (!cart) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />

    }
  return (
    <div>
            <div className="col-lg-8">
                <div className="row addcartbox border">
                    <div className="col-md-5 common-padding">
                        <strong>Product Name</strong>
                    </div>
                    <div className="col-md-2 common-padding">Price</div>
                    <div className="col-md-3 common-padding">Quality</div>
                    <div className="col-md-1 common-padding">Total</div>

                </div>

                {cart.cartItem.map((item, index) => {
                    const price = calculateFinalPrice(item.varient.mrp, item.varient.discount)
                    total += price * item.qty

                    applyCoupon()
                    applyTaxes()
                    return <div key={index} className="row addcartbox border">
                        <div className="col-md-5 common-padding">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">
                                        <Image src={item.varient.product.thumbNail?.at(0).url} width={50} height={60} className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="pro-details">
                                            <div className="pro-heading mb-1">{item.varient.product.name}</div>
                                            <div className="pro-heading mb-1">{item.varient.weight}gm</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 common-padding"> {parseFloat(item.varient.discount) === 0 ? <div className="pro-price">₹{item.varient.mrp}</div> : <><p style={{ color: "green" }}>Offer price ₹{price}</p>
                            <s>MRP{item.varient.mrp.toString()}</s>
                        </>}</div>
                        <div className="col-md-3 common-padding">
                            <div className="qty shopping-cart-input">
                                <div className="quantity_box">

                                    {item.qty}

                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 common-padding">
                            ₹{price * item.qty}

                        </div>

                    </div>
                })}
                {cart.cartComboItems.map((itm, index) => {
                    const { totalMrp, actualPrice } = calculateFinalPriceOfComboAndThumbnailArray(itm.combo)

                    total += (actualPrice * itm.qty)

                    applyCoupon()
                    applyTaxes()
                    return <div key={index} className="row addcartbox border">
                        <div className="col-md-5 common-padding">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">
                                        <ComboThumbnailCart combo={itm.combo} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 common-padding"> {parseFloat(itm.combo.discount) === 0 ? <div className="pro-price">₹{totalMrp}</div> : <><p style={{ color: "green" }}>Offer price ₹{actualPrice}</p>
                            <s>MRP{totalMrp}</s>
                        </>}</div>
                        <div className="col-md-3 common-padding">
                            <div className="qty shopping-cart-input">
                                <div className="quantity_box">

                                    {itm.qty}

                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 common-padding">₹{actualPrice * itm.qty}</div>

                    </div>
                })
                }
            </div>

        </div>
  )
}

export default MainModule
