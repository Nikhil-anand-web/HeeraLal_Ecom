
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import ProductToCartControl from '@/components/ProductToCartControl'
import ApplyCouponModule from '@/components/ApplyCouponModule'
import ComboThumbnailCart from '@/components/ComboThumbnailCart'
import calculateFinalPriceOfComboAndThumbnailArray from '@/lib/calculateFinalPriceOfComboAndThumbnailArray'
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import ComboToCartControl from '@/components/ComboToCartControl'
import percentOf from '@/lib/percentOf'
import EmptyCartButton from '@/components/EmptyCartButton'
import { redirect } from 'next/navigation'
import CheckOutButton from '@/components/CheckOutButton'
import ApplyRefralPointsModule from '@/components/ApplyRefralPointsModule'


const Page = async () => {

    const user = await getServerSession(authOptions)
    if (!user) {
        redirect('/sign-in')

    }
    const cart = await db.cart.findUnique({
        where: { userId: user.id },
        select: {
            cartItem: {
                select: {
                    varient: {
                        select: {
                            id: true,
                            weight: true,
                            product: {
                                select: {
                                    name: true,
                                    thumbNail: true

                                }


                            },
                            mrp: true,
                            discount: true

                        }

                    },
                    qty: true,

                },



            },
            coupon: {
                select: {
                    code: true,

                    discountValue: true,
                    status: true,
                    minOrderValue: true,
                    type: true
                }
            },
            refralDiscountAbsolute: true,
            cartComboItems: {
                select: {
                    qty: true,
                    combo: {
                        select: {
                            id: true,
                            name: true,
                            discountInPercent: true,
                            name: true,

                            productVarients: {
                                select: {
                                    product: {
                                        select: {

                                            thumbNail: true

                                        }

                                    },
                                    mrp: true,
                                    weight: true,

                                }
                            }

                        }

                    }

                }


            }


        }
    })
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
    const referal = await db.referal.findUnique({
        where: {
            userId: user.id
        }
    })
    const referalConstrain = await db.globalSettings.findFirst({
        where: {
            settingName: "refralDiscount"
        }
    })
    const freeShiping = await db.globalSettings.findFirst({
        where: {
            settingName: 'freeShipingCartValue'
        }
    })
   
    if (!cart) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />

    }

    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <h1 className="text-center mb-5">Your Shopping Cart</h1>
                    </div>
                </div>

                <div className="row">
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

                                            <ProductToCartControl varientId={item.varient.id} />

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

                                            <ComboToCartControl comboId={itm.combo.id} />

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 common-padding">₹{actualPrice * itm.qty}</div>

                            </div>
                        })
                        }
                    </div>

                    <div className="col-lg-4">
                        <div className="summary">
                            <div className="summary-title text-center mb-3">SUMMARY</div>
                            <div className="container-fluid summary-box">
                                <div style={{ width: "100%" }} className="row">
                                    <ApplyCouponModule coupon={cart.coupon} />
                                    <ApplyRefralPointsModule referalConstrain={referalConstrain} referal={referal} referaldiscountOnCart={cart.refralDiscountAbsolute} />

                                    <div className="col-md-6 p-2 border"><strong>Subtotal</strong></div>
                                    <div className="col-md-6 p-2 border text-end">

                                        {(absoluteCouponDiscount === 0 && cart.refralDiscountAbsolute === 0) ? `₹${total}` : <div>
                                            <small style={{ color: "green" }}> ₹{(total - absoluteCouponDiscount - cart.refralDiscountAbsolute).toPrecision(5)} </small>

                                            <s>₹{total}</s>

                                        </div>}
                                    </div>
                                    <div className="col-md-6 p-2 border"><strong>Tax</strong></div>
                                    <div className="col-md-6 p-2 border text-end"> ₹{taxAmount.toPrecision(5)}</div>
                                    <div className="col-md-6 p-2 border"><strong>Estimated Total</strong></div>
                                    <div className="col-md-6 p-2 border text-end"><strong>₹{((total - absoluteCouponDiscount - cart.refralDiscountAbsolute) + taxAmount).toPrecision(5)}</strong></div>
                                </div>
                            </div>
                            <div className="d-flex row">
                                <CheckOutButton />
                                <EmptyCartButton />
                            </div>

                           {freeShiping.value===1 && <div>
                           { ((total - absoluteCouponDiscount - cart.refralDiscountAbsolute) )<freeShiping.dependency?<p style={{color:"green",fontWeight:"bold"}} >{`Add item worth ₹${freeShiping.dependency - ((total - absoluteCouponDiscount - cart.refralDiscountAbsolute) + taxAmount).toPrecision(3)} to unlock FREE SHIPING!`}</p>:<p style={{color:"green",fontWeight:"bold"}}>FREE SHIPING unlocked</p>}
                                
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
