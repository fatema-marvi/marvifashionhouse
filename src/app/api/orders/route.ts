import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Define a CartItem type to specify the structure of each cart item
interface CartItem {
  name: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  imageUrl?: string;  // Optional field for image URL
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    console.log("📥 Incoming Order Data:", JSON.stringify(orderData, null, 2));

    if (!orderData.cartItems || orderData.cartItems.length === 0) {
      console.error("❌ Error: Cart is empty or missing!");
      return NextResponse.json({ success: false, message: "Cart is empty!" }, { status: 400 });
    }

    const newOrder = await client.create({
      _type: "order",
      customer: orderData.customer,
      orderDate: new Date().toISOString(),
      grandTotal: orderData.grandTotal,
      status: "Pending",
      cart: orderData.cartItems.map((item: CartItem) => ({ // Use CartItem type here
        _key: crypto.randomUUID(),
        _type: "cartItem",
        name: item.name,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        imageUrl: item.imageUrl || "", // Ensure image exists
      })),
    });

    console.log("✅ Order saved successfully:", JSON.stringify(newOrder, null, 2));
    return NextResponse.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: "Error placing order", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, message: "Error placing order", error: "Unknown error" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const query = `*[_type == "order"] | order(orderDate desc) {
      _id,
      customer {
        name,
        contact,
        address,
        city
      },
      orderDate,
      grandTotal,
      status,
      cart[] {
        name,
        selectedSize,
        selectedColor,
        quantity,
        imageUrl
      }
    }`;

    const orders = await client.fetch(query);
    console.log("🛒 Orders fetched from Sanity:", orders);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
