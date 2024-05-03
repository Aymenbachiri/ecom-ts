"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

interface ProductDetails {
  id: string;
  title: string;
  category: string;
  price: number;
  oldprice: number;
  description: string;
  imageurl: string;
  rating: number;
}

export default function EditForm({
  id,
  title: initialTitle,
  category: initialCategory,
  price: initialPrice,
  oldprice: initialOldPrice,
  description: initialDescription,
  imageurl: initialImageUrl,
  rating: initialRating,
}: ProductDetails) {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState<string>(initialTitle);
  const [category, setCategory] = useState<string>(initialCategory);
  const [price, setPrice] = useState<number>(initialPrice);
  const [oldprice, setOldPrice] = useState<number>(initialOldPrice);
  const [description, setDescription] = useState<string>(initialDescription);
  const [imageurl, setImageUrl] = useState<string>(initialImageUrl);
  const [rating, setRating] = useState<number>(initialRating);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          imageurl,
          oldprice,
          price,
          rating,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to edit product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!session || session.status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (session.status === "authenticated") {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-orange-600 text-white text-center font-bold uppercase">
          Edit a Product
        </div>
        <form onSubmit={handleSubmit} className="py-4 px-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={imageurl}
              onChange={(e) => setImageUrl(e.target.value)}
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
              value={oldprice}
              onChange={(e) => setOldPrice(e.target.value as any)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value as any)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter the discount Price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rating</label>
            <input
              value={rating}
              onChange={(e) => setRating(e.target.value as any)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter a rating from 1-5"
              required
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-orange-600 font-bold text-white py-2 px-4 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}
