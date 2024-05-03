"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageurl: string;
  price: number;
  updatedAt: string;
};

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR<Product[]>(
    `/api/myproducts?creator=${session?.data?.user?.email}`,
    fetcher
  );

  function formatTimestamp(timestamp: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const handleDelete = async (id: string) => {
    try {
      // Prompt the user for confirmation
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );

      // If the user confirms
      if (confirmed) {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          mutate();
        }
        if (!res.ok) {
          throw new Error("Failed to delete product");
        }
      } else {
        // Handle if the user cancels the deletion
        console.log("Deletion canceled by user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center text-center mx-auto my-[110px]  border-gray-300 h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-blue-600" />
      );
    }
    return (
      <div className="container w-full mx-auto p-4 mt-[110px]">
        <h1 className="text-center text-4xl font-bold">My Products</h1>
        {data ? (
          <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {data.map((item: Product) => (
              <div
                key={item._id}
                className="bg-transparent rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm"
              >
                <div className="relative w-full h-[500px] bg-transparent">
                  <img
                    loading="lazy"
                    className="w-auto h-auto object-cover bg-transparent"
                    src={item.imageurl}
                    alt="Product Image"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {item.price} $
                  </div>
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-4  h-[210px]">
                  <h3 className="text-lg font-medium mb-2 h-10 ">
                    {item.title.substring(0, 30)} ...
                  </h3>
                  <p className=" text-sm mb-4 h-10">
                    {item.description.substring(0, 91)} ...
                  </p>
                  <div className="flex items-center justify-between text-center pt-4 ">
                    <span className="font-bold text-lg">
                      {formatTimestamp(item.updatedAt).substring(0, 10)}{" "}
                    </span>
                    <Link
                      href={`/products/${item._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-full"
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link
                      href={`/edit/${item._id}`}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold p-2 rounded-full text-center"
                    >
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h1 className="mt-10">
              You don&apos;t have any product.
              <Link className="ml-2 underline" href="/sell">
                Create One
              </Link>
            </h1>
          </>
        )}
      </div>
    );
  }
}
