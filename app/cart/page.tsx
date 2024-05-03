"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/reduxToolkit/shopSlice";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldprice: number;
  description: string;
  imageurl: string;
  rating: number;
  creator: string;
  quantity: number;
}

export default function Cart() {
  const products: Product[] = useSelector((state: any) => state.shop.products);
  const dispatch = useDispatch();
  const totalPrice = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      dispatch(clearCart());
    }
  };
  return (
    <>
      {products?.length > 0 ? (
        <section className="h-[90vh]  my-[110px]">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">My Cart</h1>
            </div>

            <div className="mx-auto mt-8 max-w-2xl md:mt-12">
              <div className="bg-white rounded-md shadow">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      {products.map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0 relative">
                            <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-black text-sm font-medium text-white shadow sm:-top-2 sm:-right-2">
                              {item.quantity}
                            </span>

                            <img
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={item.imageurl}
                              alt="item-image"
                            />
                          </div>

                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">
                                  {item.title}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  {item.category}
                                </p>
                              </div>

                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                  ${item.quantity * item.price}
                                </p>

                                <div className="sm:order-1">
                                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                    <button
                                      onClick={() =>
                                        dispatch(decreaseQuantity(item.id))
                                      }
                                      className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    >
                                      -
                                    </button>
                                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                      1
                                    </div>
                                    <button
                                      onClick={() =>
                                        dispatch(increaseQuantity(item.id))
                                      }
                                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                                type="button"
                                className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <svg
                                  className="block h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                    className=""
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${totalPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">
                        Free
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 border-b flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        USD
                      </span>{" "}
                      {totalPrice}
                    </p>
                  </div>
                  <div className="mt-8  flex items-center justify-between">
                    <button
                      onClick={handleResetCart}
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mt-6 text-center flex items-center gap-4">
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Checkout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                    <Link
                      href="/products"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-green-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-800"
                    >
                      Continue Shopping
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex-col md:flex md:flex-row justify-center items-center my-[110px]">
          <div className="flex justify-center px-2">
            <img
              src="https://metro-website-images.s3.eu-west-1.amazonaws.com/plugins/user/images/emptycart.png"
              loading="lazy"
              alt="empty cart"
              className="rounded-full"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8  flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/products"}
              className=" rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg hover:text-white duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
