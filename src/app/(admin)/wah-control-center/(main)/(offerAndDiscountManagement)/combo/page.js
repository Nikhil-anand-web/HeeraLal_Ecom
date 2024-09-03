
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ComboModel from '@/components/adminComp/ComboModel'
import db from '@/lib/db'


const Page = async () => {

    const user = await getServerSession(authOptions)

    if (!user?.permissions[0].offersAndDiscounts) {

        return <p>Access Denied</p>

    }
    const combos = await db.combo.findMany({
        select: {
            id: true,
            name: true,
            discountInPercent: true,
            status: true,
            qty: true,
            productVarients: {
                select: {
                    slug: true

                }
            },
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
                    {combos.map((combo, i) => <ComboModel key={i} combo={combo} />)}
                   
                </div>
            </div>
        </section>
    )
}

export default Page 
