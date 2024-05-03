import Product from "@/models/product";
import connectToDB from "@/utils/database";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return new Response("Failed to fetch all products", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Log the received body

    const newProduct = new Product(body);
    await connectToDB();
    await newProduct.save();

    return new Response("Product has been created", { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return new Response("Failed to create product", { status: 500 });
  }
}
