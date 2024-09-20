"use server"
import fs from 'fs';
import path from 'path';
import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import getShipingJWT from '@/lib/getShipingJWT';


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
    date
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
                CollectableAmount: 0,
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
                PDFOutputNotRequired: true,
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
                OriginArea: "DEL",
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




async function createAWB(orderId, pickupTime = "1600", pickupdate = "1726846176677") {
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
                    const dimentionArray = []
                    const customerName = order.CustomerMeta.firstName + " " + order.CustomerMeta.lastName
                    const customerMobile = order.CustomerMeta.mobile
                    const customerPincode = order.CustomerMeta.pinCode.toString()
                    const customerAddress = order.CustomerMeta.address + order.CustomerMeta.city + order.CustomerMeta.state + "INDIA" + order.CustomerMeta.pinCode.toString()
                    const returnAddress = process.env.RETURN_ADD
                    const returnContact = process.env.RETURN_CONTACT
                    const returnEmail = process.env.RETURN_EMAIL
                    const returnMobile = process.env.RETURN_MOBILE
                    const returnPincode = process.env.RETURN_PINCODE
                    const actualweight = order.totalWeight

                    const declaredValue = order.finalPrice



                    // var totalNumberOfItem = 0
                    //  order.varientMeta.forEach(varient => {
                    //     totalNumberOfItem+=varient.qty
                    //     // const obj = JSON.parse(varient.size)
                    //     // const szobj =  {

                    //     // }





                    //  });
                    //  order.comboMeta.forEach((meta)=>{
                    //    const numberOfVarients= meta.combo.productVarients.length
                    //    const numberofCombo = meta.qty
                    //    totalNumberOfItem += (numberOfVarients,numberofCombo)


                    //  })







                    const requestObject = generateRequestObject({
                        consigneeMobile: customerMobile,
                        consigneeName: customerName,
                        consigneePincode: customerPincode,
                        ConsigneeFullAddress: customerAddress,
                        returnAddress1: returnAddress,
                        returnContact: returnContact,
                        returnEmailID: returnEmail,
                        returnPincode: returnPincode,
                        actualWeight: actualweight,
                        creditReferenceNo: order.orderId + "14",
                        declaredValue: declaredValue,
                        dimensions: [],
                        pickupTime: pickupTime,
                        pieceCount: 1,
                        productCode: "A",
                        productType: 2,
                        subProductCode: "P",
                        registerPickup: true,
                        customerAddress1: returnAddress,
                        customerMobile: returnMobile,
                        customerName: returnContact,
                        customerPincode: "122002",
                        customerCode: "246525",
                        loginID: process.env.SHIPING_LOGIN_ID,
                        licenceKey: process.env.SHIPING_LIC,
                        apiType: "S",
                        date: pickupdate
                    });
                    // console.log(requestObject)
                    const res = await getShipingJWT()
                    const url = process.env.SHIPING_BASE_URL
                    const options = {
                        method: 'POST',
                        url: `${url}/transportation/waybill/v1/GenerateWayBill`,
                        headers: { 'content-type': 'application/json', JWTToken: res.jwt },
                        data: requestObject
                    };
                   

                    const response = await axios.request(options)
                    const shipmentMeta = response.data.GenerateWayBillResult

                    await db.orders.update({
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

                    revalidatePath('/wah-control-center/orderDetails/')

                    return {

                        success: true,
                        message: `AWB ${shipmentMeta.AWBNo}`
                    }


                }



            } catch (error) {
                console.log(error)
                console.log(error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation)

                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation || "internal server error",

                }

            }

        }

    }


}
export default createAWB
