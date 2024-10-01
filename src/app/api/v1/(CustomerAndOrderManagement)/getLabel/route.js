import { getServerSession } from "next-auth";

import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    const reqObj = await req.json();

    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].consumerAndOrderManagement) {
                    const filePath = path.join(process.cwd(), 'shipingLabels', `${reqObj[0].awb}.pdf`);

                    // Check if the file exists
                    if (fs.existsSync(filePath)) {
                        // Create a response with the file stream
                        const fileStream = fs.createReadStream(filePath);

                        // Build the response
                        const res = new NextResponse(fileStream, {
                            headers: {
                                'Content-Type': 'application/pdf', // Set content type
                                'Content-Disposition': 'attachment; filename="your-pdf.pdf"', // Set filename for download
                            },
                        });

                        return res; // Send the response
                    } else {
                        return NextResponse.json({
                            success: false,
                            message: "File not found"
                        }, { status: 404 });
                    }
                } else {
                    return NextResponse.json({
                        success: false,
                        message: "Unauthorized Request"
                    }, { status: 403 }); // Use 403 for unauthorized access
                }
            } catch (error) {
                console.error(error);
                return NextResponse.json({
                    success: false,
                    message: error.meta?.cause || "Internal Server Error"
                }, { status: 500 });
            }
        }
        return NextResponse.json({
            success: false,
            message: "Bad Request"
        }, { status: 400 });
    }

    return NextResponse.json({
        success: false,
        message: "User not authenticated"
    }, { status: 401 }); // Handle unauthenticated user
}
