"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Sell() {
  const session = useSession();
  const router = useRouter();
  console.log(session.data);

  if (session.status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const title = (target.elements.namedItem("title") as HTMLInputElement)
      .value;
    const description = (target[1] as HTMLInputElement).value;
    const category = (target[2] as HTMLInputElement).value;
    const imageurl = (target[3] as HTMLInputElement).value;
    const oldprice = (target[4] as HTMLInputElement).value;
    const price = (target[5] as HTMLInputElement).value;
    const rating = (target[6] as HTMLInputElement).value;
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          category,
          imageurl,
          oldprice,
          price,
          rating,
          creator: session.data?.user?.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      } else {
        alert("product added successfully");
        router.push("/products");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific errors of type Error
        console.error("An error occurred:", error.message);
      } else {
        // Handle other types of errors
        console.error("An unknown error occurred:", error);
      }
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="max-w-md mx-auto mt-[110px] mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Add a Product
        </div>
        <form onSubmit={handleSubmit} className="py-4 px-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter product title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="shadow appearance-none resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <select
              name="category"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option disabled value="">
                Select a category
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image url
            </label>
            <input
              name="imageurl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Example www.unsplash.com/photos/1352"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Old Price in $$
            </label>
            <input
              name="oldprice"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter the old Price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Price in $$
            </label>
            <input
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter the discount Price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rating</label>
            <input
              name="rating"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter a rating from 1-5"
              required
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
