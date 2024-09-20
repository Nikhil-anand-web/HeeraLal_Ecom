"use server"

import db from "@/lib/db";
import getPinCodeDetails from "@/lib/getPinCodeDetails";
import percentOf from "@/lib/percentOf";

async function calculateShippingCost(zone, weightInGrams) {
    try {


        var rate = 0
        if (zone === 'A') {
           const rateObj = await db.globalSettings.findFirst({
                where: {
                    settingName: "shipingRateOfAreaA"
                }
            })
            rate = rateObj.value

        } else if (zone === 'B') {
           const rateobj = await db.globalSettings.findFirst({
                where: {
                    settingName: "shipingRateOfAreaB"
                }
            })
            rate = rateobj.value

        } else if (zone === 'C') {
           const rateobj = await db.globalSettings.findFirst({
                where: {
                    settingName: "shipingRateOfAreaC"
                }
            })
            rate = rateobj.value

        }
        
        

        const fuelSurchargeObj = await db.globalSettings.findFirst({
            where:
            {
                settingName: "shipingFuleSurChargeRatio"
            }
        })
        const CAFObj = await db.globalSettings.findFirst({
            where:
            {
                settingName: "shipingCAFRatio"
            }
        });
        const GSTObj = await db.globalSettings.findFirst({
            where:
            {
                settingName: "shipingGSTRatio"
            }
        });
        const GST =parseFloat(GSTObj.value)
        const CAF =parseFloat(CAFObj.value)
        const  fuelSurcharge=parseFloat(fuelSurchargeObj.value)
       


        const baseRate = parseFloat(rate);
        // if (!baseRate) {
        //     throw new Error("Invalid zone. Please use 'A', 'B', or 'C'.");
        // }
        console.log(baseRate)


       
        const chargeableWeight = Math.ceil(weightInGrams / 500); // Rounds up to the nearest 500g


        const baseCost = baseRate * chargeableWeight;


        const fuelCost = baseCost * fuelSurcharge;
        const cafCost = baseCost * CAF;


        const totalBeforeGST = baseCost + fuelCost + cafCost;


        const gstAmount = totalBeforeGST * GST;


        const finalTotal = totalBeforeGST + gstAmount;

        return finalTotal.toFixed(2); // Return the final amount with 2 decimal places
    } catch (error) {
        console.log(error)
        throw error

    }
}


export default async function getShipingCharges(pincode, orderObjectIdObject) {
    console.log(orderObjectIdObject)
    try {
        const shipinfConstrain = await db.globalSettings.findFirst({

            where: {
                settingName: "freeShipingCartValue"
            }
        })
        if (shipinfConstrain.value === 1) {
            const orderInfo = await db.orders.findUnique({
                where: {
                    id: orderObjectIdObject
                }, select: {
                    refralDiscountAbsolute: true,
                    subTotal: true,
                    taxes: true,
                    couponMeta: true

                }
            })
            const subtotal = orderInfo.subTotal
            const taxes = orderInfo.taxes
            const referaldiscount = orderInfo.refralDiscountAbsolute
            const couponMeta = orderInfo.couponMeta
            var couponDiscount = 0

            if (couponMeta) {
                if (couponMeta.type === 'absolute') {
                    couponDiscount = parseFloat(couponMeta.discountValue)

                } else if (couponMeta.type === 'percent') {
                    const val = percentOf(subtotal, parseFloat(couponMeta.discountValue))

                    couponDiscount = val


                }

            }
            if (((subtotal - couponDiscount - referaldiscount)) >= shipinfConstrain.dependency) {
                return {
                    success: true,

                    message: "fetch success",
                    charges: 0
                };

            }



        }

        const pincodeDetails = await getPinCodeDetails(pincode.toString())

        const zone = pincodeDetails.data.GetServicesforPincodeResult.DPZone
        const order = await db.orders.findUnique({
            where: {
                id: orderObjectIdObject
            }, select: {
                totalWeight: true
            }
        })

       
        const cost = await calculateShippingCost(zone, parseFloat(order.totalWeight))
      
        return {
            success: true,

            message: "fetch success",
            charges: cost
        };



    } catch (error) {
        console.log(error)
        return {
            success: false,

            message: "calculation failed",
            charges: null
        };


    }







}