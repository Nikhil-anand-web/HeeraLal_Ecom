
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ComboModel from '@/components/adminComp/ComboModel'
import db from '@/lib/db'
import CouponModel from '@/components/adminComp/CouponModel'


const Page = async () => {

    const user = await getServerSession(authOptions)

    if (!user?.permissions[0].offersAndDiscounts) {

        return <p>Access Denied</p>

    }
    const coupons = await db.coupons.findMany({
        select: {
            id: true,
            code: true,
            type: true,
            discountValue: true,
            minOrderValue: true,
            status: true,
            createdBy: {
                select: {
                    userName: true
                }
            },

        }
    })
    return (
        <section className="login-page">
            <div className="container">
                <div className={"hide-scrollbar"} style={{ height: "72vh", overflow: "scroll", width: "100%" }}>
                    {coupons.map((coupon, i) => <CouponModel key={i} coupon={coupon} />)}

                </div>
            </div>
        </section>
    )
}

export default Page 
