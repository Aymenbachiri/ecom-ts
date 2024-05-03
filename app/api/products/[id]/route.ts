import Product from "@/models/product";
import connectToDB from "@/utils/database";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const product = await Product.findById(id);
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch product", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  const body = await req.json();
  try {
    await connectToDB();
    // Find the exisitingProduct
    const existingProduct = await Product.findById(params.id);

    if (!existingProduct) {
      return new Response("Product not found", { status: 404 });
    }

    // Update the product with the new data
    Object.assign(existingProduct, body);
    await existingProduct.save();

    return new Response("Product updated successfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to Update Product", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  const { id } = params;
  try {
    await connectToDB();

    await Product.findByIdAndDelete(id);
    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Product", { status: 500 });
  }
};
