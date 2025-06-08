// app/api/image-generator/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const BASE_URL = "https://aigurulab.tech";

    const result = await axios.post(
      BASE_URL + "/api/generate-image",
      {
        width: 1024,
        height: 1024,
        input: prompt,
        model: "sdxl",
        aspectRatio: "16:9",
      },
      {
        headers: {
          "x-api-key": process.env.AI_GURU_LAB_API,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ image: result.data.image });
  } catch (error: any) {
    console.error("Image generation failed", error.message);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
export const GenerateImage = async (prompt: string) => {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (!res.ok) {
      throw new Error("Image generation failed");
    }
  
    const data = await res.json();
    return data.image;
  };
  