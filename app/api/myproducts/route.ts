import Product from "@/models/product";
import connectToDB from "@/utils/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const creator = url.searchParams.get("creator");
  try {
    await connectToDB();

    const products = await Product.find(creator ? { creator } : {});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch my products", { status: 500 });
  }
}
