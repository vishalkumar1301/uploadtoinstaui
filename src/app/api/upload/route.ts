import { NextResponse } from "next/server";
import instagramService from "@/lib/instagramService";

const PUBLIC_IMAGE_URL = "https://i.ibb.co/wQh5YBB/image.png";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const caption = formData.get("caption") as string;

    // For now, we'll use the public image URL instead of uploading
    const imageUrl = PUBLIC_IMAGE_URL;

    // Post the image to Instagram
    const result = await instagramService.postSingleImage(imageUrl, caption);

    return NextResponse.json({
      success: true,
      message: "Image uploaded to Instagram successfully",
      postId: result,
    });
  } catch (error) {
    console.error("Error uploading to Instagram:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading to Instagram",
      error: (error as Error).message,
    }, { status: 500 });
  }
}
