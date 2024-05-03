import ProductDetails from "@/components/ProductDetails";
import React from "react";

async function getData(id: string) {
  const url = process.env.API_URL;

  const res = await fetch(`${url}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getData(params.id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Product({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <ProductDetails
      id={data._id}
      title={data.title}
      category={data.category}
      price={data.price}
      oldprice={data.oldprice}
      description={data.description}
      imageurl={data.imageurl}
      rating={data.rating}
      creator={data.creator}
    />
  );
}
