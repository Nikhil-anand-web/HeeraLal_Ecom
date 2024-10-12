"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import bcryptjs from "bcryptjs"
import isFloat from "@/lib/isFloat"
import isInt from "@/lib/isInt"
import validatePhoneNumber from "@/lib/validatePhoneNumber"
import { redirect } from "next/navigation"

async function updateUserDetails(formData) {
    const user = await getServerSession(authOptions)

    if (user) {
        try {
            const requestData = {}
            await formData.forEach((value, key) => {
                if (key !== 'mobile') {
                    requestData[key] = isInt(value) ? +value : (isFloat(value) ? parseFloat(value) : value);
                } else {
                    requestData[key] = value;
                }
            });

            // Filter out null, undefined, and empty string values
            const updateData = Object.fromEntries(
                Object.entries(requestData).filter(([_, value]) => value !== null && value !== 'undefined' && value !== '')
            );

            if (updateData.mobile) {
                if (!validatePhoneNumber(updateData.mobile)) {
                    return {
                        success: false,
                        message: `Please put country code in phone number`
                    }
                } else {
                    updateData.mobile = validatePhoneNumber(updateData.mobile);
                    updateData.mobileVerified = false; // Ensure we reset the mobile verified status
                }
            }

            // Check for uniqueness of mobile number before updating
            if (updateData.mobile) {
                const existingUser = await db.user.findUnique({
                    where: { mobile: updateData.mobile } // Adjust the field name according to your schema
                });

                if (existingUser && existingUser.id !== user.id) {
                    return {
                        success: false,
                        message: "The mobile number is already in use."
                    };
                }
            }

            const nw = await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    ...updateData,
                }
            });

            console.log(nw);

            if (!nw.mobileVerified) {
                return {
                    success: true,
                    message: `Profile updated.please verify`,
                    redirect: '/verify-phone'
                }
            }

            return {
                success: true,
                message: `Profile updated.`
            }

        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.code === "P2002" ? "The field's value is already present" : error.meta?.cause || "Internal server error",
            }
        }
    }
}

export default updateUserDetails;
