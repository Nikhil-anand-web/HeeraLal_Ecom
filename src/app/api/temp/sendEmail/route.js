import { NextResponse } from "next/server";
import sendEmail from "./send";

export async function POST(req) {
    try {

        const reqObj = await req.json()
       const res= await sendEmail(reqObj)
        return NextResponse.json({
            success: true,
            message: "Success",
            smtpResponse:res
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed"
        }, { status: 500 });

    }

}