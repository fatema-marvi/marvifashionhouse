import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client"; // Adjust import based on your project

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const orders = await client.fetch(`*[_type == "order"] | order(orderDate desc)`);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
