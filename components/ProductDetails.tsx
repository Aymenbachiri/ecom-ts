"use client";

import { addToCart } from "@/reduxToolkit/shopSlice";
import { useDispatch } from "react-redux";

interface ProductDetailsProps {
  id: string;
  title: string;
  category: string;
  price: number;
  oldprice: number;
  description: string;
  imageurl: string;
  rating: number;
  creator: string;
}

export default function ProductDetails({
  id,
  title,
  category,
  price,
  oldprice,
  description,
  imageurl,
  rating,
  creator,
}: ProductDetailsProps) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 pt-[110px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={imageurl}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: id,
                        title: title,
                        description: description,
                        category: category,
                        imageurl: imageurl,
                        oldprice: oldprice,
                        price: price,
                        rating: rating,
                        creator: creator,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full bg-[#ec413d] dark:bg-red-600 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 dark:hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-black dark:text-gray-300 text-3xl uppercase mb-4">
              {category}
            </p>
            <div className="flex mb-4">
              <div className="mr-4 flex gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  ${price}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  In Stock
                </span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Rating:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {rating}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Available Color:
              </span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Available Size:
              </span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  S
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  M
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  L
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XL
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XXL
                </button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {description}
              </p>
            </div>
            <div className="mt-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Store:
              </span>
              <p className="text-black flex items-center gap-2 dark:text-gray-300 text-sm mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>

                <span className="text-2xl uppercase underline">
                  {" "}
                  {creator}{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
