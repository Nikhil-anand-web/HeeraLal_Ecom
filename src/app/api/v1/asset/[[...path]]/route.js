// app/api/v1/asset/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    // Extract the image path from the request
    const imagePath = params.path.join('/'); 

    // Construct the full path to the image
    const fullPath = path.join(process.cwd(), 'asset', imagePath);
    console.log(fullPath)

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
        // Create a read stream for the image
        const imageStream = fs.createReadStream(fullPath);

        // Get the file extension to set the content type correctly
        const ext = path.extname(fullPath).toLowerCase();
        const contentType =
            ext === '.jpeg' ? 'image/jpeg' :
            ext === '.jpg' ? 'image/jpeg' : // Handle .jpg as well
            ext === '.png' ? 'image/png' :
            ext === '.webp' ? 'image/webp' : // Added WebP support
            'application/octet-stream'; // Add more formats as needed

        // Disable aggressive caching by using no-cache or cache-busting mechanism
        return new Response(imageStream, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                
            },
        });
    } else {
        // If the file does not exist, return a 404 response
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
}
