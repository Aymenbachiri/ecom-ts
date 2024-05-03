"use client";

import { addToCart } from "@/reduxToolkit/shopSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageurl: string;
  price: number;
  oldprice: number;
  rating: number;
  creator: string;
};

async function getData(): Promise<Product[]> {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getData()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-center mx-auto mt-[110px]  border-gray-300 h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-blue-600" />
    );
  }

  return (
    <div className="container mx-auto p-4 mt-[110px]">
      <h1 className="text-center text-4xl font-bold">
        Discover the potential within you.
      </h1>
      <h1 className="text-center text-4xl font-bold">
        And unlock a world of endless possibilities with our products
      </h1>
      <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16 mt-16">
        {data.map((product) => (
          <div
            key={product._id}
            className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
          >
            <Link
              href={`/products/${product._id}`}
              className="mx-auto text-center"
            >
              <img
                className="h-60 rounded-t-lg object-cover mx-auto"
                src={product.imageurl}
                alt="product image"
              />
            </Link>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-[#ec413d] text-center text-sm text-white">
              Sale{" "}
            </span>
            <div className="mt-4 px-5 pb-5">
              <Link href={`/products/${product._id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                  {product.title.substring(0, 25)}...
                </h5>
              </Link>
              <Link
                href={`/products/${product._id}`}
                className="mt-2.5 mb-5 flex items-center"
              >
                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {product.rating}
                </span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </Link>
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    ${product.oldprice}
                  </span>
                </p>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product._id,
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        imageurl: product.imageurl,
                        oldprice: product.oldprice,
                        price: product.price,
                        rating: product.rating,
                        creator: product.creator,
                        quantity: 1,
                      })
                    )
                  }
                  className="flex items-center rounded-md bg-[#ec413d] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
