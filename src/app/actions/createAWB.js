"use server"
import fs from 'fs';
import path from 'path';
import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import getShipingJWT from '@/lib/getShipingJWT';
import savePdfFile from '@/lib/savePdfFile';
import gramsToKg from '@/lib/gramToKg';


function generateRequestObject({
    consigneeMobile,
    consigneeName,
    consigneePincode,
    returnAddress1,
    returnContact,
    returnEmailID,
    returnPincode,
    actualWeight,
    creditReferenceNo,
    declaredValue,
    dimensions,
    pickupTime,
    pieceCount,
    productCode,
    productType,
    subProductCode,
    registerPickup,
    customerAddress1,
    customerMobile,
    customerName,
    customerPincode,
    customerCode,
    loginID,
    licenceKey,
    apiType,
    ConsigneeFullAddress,
    date,
    CollectableAmount,
    originArea

}) {
    return {
        Request: {
            Consignee: {
                AvailableDays: "",
                AvailableTiming: "",
                ConsigneeAddress1: ConsigneeFullAddress,
                ConsigneeAddress2: "",
                ConsigneeAddress3: "",
                ConsigneeAddressType: "",
                ConsigneeAddressinfo: "",
                ConsigneeAttention: "",
                ConsigneeEmailID: "",
                ConsigneeFullAddress: ConsigneeFullAddress,
                ConsigneeGSTNumber: "",
                ConsigneeLatitude: "",
                ConsigneeLongitude: "",
                ConsigneeMaskedContactNumber: "",
                ConsigneeMobile: consigneeMobile,
                ConsigneeName: consigneeName,
                ConsigneePincode: consigneePincode,
                ConsigneeTelephone: ""
            },
            Returnadds: {
                ManifestNumber: "",
                ReturnAddress1: returnAddress1,
                ReturnAddress2: "",
                ReturnAddress3: "",
                ReturnAddressinfo: "",
                ReturnContact: returnContact,
                ReturnEmailID: returnEmailID,
                ReturnLatitude: "",
                ReturnLongitude: "",
                ReturnMaskedContactNumber: "",
                ReturnMobile: "",
                ReturnPincode: returnPincode,
                ReturnTelephone: ""
            },
            Services: {
                AWBNo: "",
                ActualWeight: actualWeight,
                CollectableAmount: CollectableAmount,
                Commodity: {
                    CommodityDetail1: "",
                    CommodityDetail2: "",
                    CommodityDetail3: ""
                },
                CreditReferenceNo: creditReferenceNo,
                CreditReferenceNo2: "",
                CreditReferenceNo3: "",
                DeclaredValue: declaredValue,
                DeliveryTimeSlot: "",
                Dimensions: dimensions,
                FavouringName: "",
                IsDedicatedDeliveryNetwork: false,
                IsDutyTaxPaidByShipper: false,
                IsForcePickup: false,
                IsPartialPickup: false,
                IsReversePickup: false,
                ItemCount: 0,
                Officecutofftime: "",
                PDFOutputNotRequired: false,
                PackType: "",
                ParcelShopCode: "",
                PayableAt: "",
                PickupDate: ` /Date(${date})/`,
                PickupMode: "",
                PickupTime: pickupTime,
                PickupType: "",
                PieceCount: pieceCount,
                PreferredPickupTimeSlot: "",
                ProductCode: productCode,
                ProductFeature: "",
                ProductType: productType,
                RegisterPickup: registerPickup,
                SpecialInstruction: "",
                SubProductCode: subProductCode,
                TotalCashPaytoCustomer: 0,
                itemdtl: [],
                noOfDCGiven: 0
            },
            Shipper: {
                CustomerAddress1: customerAddress1,
                CustomerAddress2: "",
                CustomerAddress3: "",
                CustomerAddressinfo: "",
                CustomerBusinessPartyTypeCode: "",
                CustomerCode: customerCode,
                CustomerEmailID: "",
                CustomerGSTNumber: "",
                CustomerLatitude: "",
                CustomerLongitude: "",
                CustomerMaskedContactNumber: "",
                CustomerMobile: customerMobile,
                CustomerName: customerName,
                CustomerPincode: customerPincode,
                CustomerTelephone: "",
                IsToPayCustomer: false,
                OriginArea: originArea,
                Sender: "",
                VendorCode: ""
            }
        },
        Profile: {
            LoginID: loginID,
            LicenceKey: licenceKey,
            Api_type: apiType
        }
    };
}




async function createAWB(orderId, pickupTime, pickupdate, dimendarr, noOfPieces) {
    "use server"

    function validateSlug(value) {

        if (!(/^[a-z][a-zA-Z0-9]*$/.test(value))) {
            return false;
        }
        return true;
    }


    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].consumerAndOrderManagement) {

                    const order = await db.orders.findUnique({
                        where: {
                            orderId: orderId
                        }
                    });
                    console.log(order)
                    if (order.paymentStatus !== 1) {

                        return {

                            success: false,
                            message: `unpaid order`
                        }

                    }
                    const dimentionArray = []
                    const customerName = order.CustomerMeta.firstName + " " + order.CustomerMeta.lastName
                    const customerMobile = order.CustomerMeta.mobile
                    const customerPincode = order.CustomerMeta.pinCode.toString()
                    const customerAddress = order.CustomerMeta.address + order.CustomerMeta.city + " " + order.CustomerMeta.state+" " + "INDIA" + " " + order.CustomerMeta.pinCode.toString()
                    const returnAddress = process.env.RETURN_ADD
                    const returnContact = process.env.RETURN_CONTACT
                    const returnEmail = process.env.RETURN_EMAIL
                    const returnMobile = process.env.RETURN_MOBILE
                    const returnPincode = process.env.RETURN_PINCODE
                    const actualweight = order.totalWeight

                    const declaredValue = order.finalPrice










                    const requestObject = generateRequestObject({
                        consigneeMobile: customerMobile,
                        consigneeName: customerName,
                        consigneePincode: customerPincode,
                        ConsigneeFullAddress: customerAddress,
                        returnAddress1: returnAddress,
                        returnContact: returnContact,
                        returnEmailID: returnEmail,
                        returnPincode: returnPincode,
                        actualWeight: gramsToKg(actualweight),
                        creditReferenceNo: order.orderId,
                        declaredValue: declaredValue,
                        dimensions: dimendarr,//  which dimention
                        pickupTime: pickupTime,
                        pieceCount: noOfPieces,//piece count and item count
                        productCode: process.env.SHIPING_PROD_CODE,
                        productType: 1,
                        subProductCode: "",
                        registerPickup: true,
                        customerAddress1: returnAddress,
                        customerMobile: returnMobile,
                        customerName: returnContact,
                        customerPincode: returnPincode,
                        customerCode: process.env.SHIPING_CUST_CODE,
                        loginID: process.env.SHIPING_LOGIN_ID,
                        licenceKey: process.env.SHIPING_LIC,
                        apiType: process.env.SHIPING_API_TYPE,
                        date: pickupdate,
                        CollectableAmount: 0,
                        originArea: process.env.SHIPING_ORIGIN
                    });
                    // console.log(requestObject)
                    const res = await getShipingJWT()
                    console.log(requestObject)
                    const url = process.env.SHIPING_BASE_URL
                    const options = {
                        method: 'POST',
                        url: `${url}/transportation/waybill/v1/GenerateWayBill`,
                        headers: { 'content-type': 'application/json', JWTToken: res.jwt },
                        data: requestObject
                    };


                    const response = await axios.request(options)
                    const shipmentMeta = response.data.GenerateWayBillResult
                    const downloadDir = path.join(process.cwd(), 'shipingLabels', `${shipmentMeta.AWBNo}.pdf`);
                    savePdfFile(shipmentMeta.AWBPrintContent, downloadDir)
                    delete shipmentMeta.AWBPrintContent

                    const rtsorder = await db.orders.update({
                        where: {
                            orderId: order.orderId, // Ensure orderId is the correct field name in your schema
                        },
                        data: {
                            shipmentMeta: shipmentMeta, // Ensure this field is defined in your schema
                            awb: shipmentMeta.AWBNo,
                            shipingStatus: "ready to ship",
                            orderStatus: 1,
                            lastEditedBy: {
                                connect: {
                                    id: user.id, // Ensure user.id is a valid identifier for the related user
                                },
                            },
                        },
                    });
                    if (rtsorder.shortItmsMeta) {
                        await Promise.all(
                            rtsorder.shortItmsMeta.shortVarients.map(async (obj) => {
                                const { shortQty, id } = obj;
    
                                await db.varient.update({
                                    where: {
                                        id: id,
                                    },
                                    data: {
                                        qty: {
                                            increment: shortQty,
                                        },
                                        shortItmStatus: 2
                                    },
                                });
                            })
                        );
                        await Promise.all(
                            rtsorder.shortItmsMeta.shortCombo.map(async (obj) => {
                                const { shortQty, id } = obj;
    
                                await db.combo.update({
                                    where: {
                                        id: id,
                                    },
                                    data: {
                                        qty: {
                                            increment: shortQty,
                                        },
                                        shortItmStatus: 2
                                    },
    
                                });
                            })
                        );
                        
                    }

                   

                    revalidatePath('/wah-control-center/orderDetails/')
                    return {

                        success: true,
                        message: `AWB ${shipmentMeta.AWBNo}`
                    }


                }



            } catch (error) {
                console.log( error?.response?.data['error-response'][0])


                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation || "internal server error",

                }

            }

        }

    }


}
export default createAWB
