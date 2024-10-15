import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

import db from "@/lib/db";
import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getServerSession(authOptions);
  const formData = await req.formData();

  if (user) {
    if (user.role === 1 || user.role === 2) {
      try {
        if (user.permissions[0].productAndInventory) {
          const slug = formData.get('slug');
          const uploadDirectory = path.join(process.cwd(), 'asset', 'categories', `${slug}`);

          // Clean the folder if it exists
          if (fs.existsSync(uploadDirectory)) {
            fs.rmSync(uploadDirectory, { recursive: true, force: true });
          }

          // Create the directory after cleaning
          fs.mkdirSync(uploadDirectory, { recursive: true });

          // Access uploaded files
          const files = formData.getAll('samplePhotos');
          const jsonToDb = [];

          // Use a for...of loop to handle async/await for file processing
          for (const [index, file] of files.entries()) {
            const timestamp = Date.now(); // Get the current timestamp
            const fileName = `${index}-${timestamp}.jpeg`; // Add timestamp to file name
            const filePath = path.join(uploadDirectory, fileName);

            const bytes = await file.arrayBuffer(); // Await the arrayBuffer() call
            const buffer = Buffer.from(bytes); // Convert ArrayBuffer to Buffer
            fs.writeFileSync(filePath, buffer); // Synchronously writing file to disk

            jsonToDb.push({
              url: `/asset/categories/${slug}/${fileName}`, // File URL with timestamped file name
              alt: "categoryImage",
            });
          }

          // Create new category in the database
          const newCategory = await db.category.create({
            data: {
              categoryName: formData.get('categoryName'),
              displayOrder: parseInt(formData.get('displayOrder')),
              slug: slug,
              image: JSON.stringify(jsonToDb), // Convert the image metadata array to JSON
              showOnHome: formData.get('showOnHome') === 'true', // Convert to boolean
              parent: formData.get('parentId') !== "0" ? { connect: { id: formData.get('parentId') } } : undefined,
              createdBy: { connect: { id: user.id } },
            },
          });

          return NextResponse.json({
            success: true,
            message: 'Category created successfully',
            category: newCategory,
          });
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({
          success: false,
          message: error.code === 'P2002' ? "Slug is already used" : error.meta?.cause || "Internal server error",
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: false,
      message: "Bad Request",
    }, { status: 400 });
  }
}
