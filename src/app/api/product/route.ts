import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await client.fetch(` 
      *[_type in ["mensWear", "womensWear"]]{
        _id,
        name,
        description,
        price,
        "imageUrl": image.asset->url,
        category,
        colors[] {
          colorName,
          "image": image.asset->url
        },
        sizes,
        "sizeChart": sizeChart.asset->url
      }
    `);
    console.log("Fetched Products:", JSON.stringify(products, null, 2)); // More readable logging
    //console.log("Fetched Products:", products); // Debugging
    
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
