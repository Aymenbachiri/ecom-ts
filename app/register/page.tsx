"use client";

import { Alert } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [captcha, setCaptcha] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const name = (target[0] as HTMLInputElement).value;
    const email = (target[1] as HTMLInputElement).value;
    const password = (target[2] as HTMLInputElement).value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.status === 201 && captcha) {
        alert("Registration completed Successfully");
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific errors of type Error
        console.error("Registration Failed:", error.message);
      } else {
        // Handle other types of errors
        console.error("An unknown error occurred:", error);
      }
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d23d09' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
      className="bg-[#ee5522] h-[85vh] dark:bg-black flex flex-col gap-5  items-center justify-center mt-8"
    >
      <div className=" p-4 rounded-md">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
          <input
            type="text"
            placeholder="name"
            required
            className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
          />
          <input
            type="text"
            placeholder="Email"
            required
            className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
          />
          <ReCAPTCHA
            onChange={() => setCaptcha(true)}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            className="mx-auto"
          />
          <button
            type="submit"
            className="w-[300px] p-4 text-white bg-[#ec413d] font-bold"
          >
            Register
          </button>
          <h1 className="text-red-500 font-bold text-2xl">
            {error && "failed to register"}{" "}
          </h1>
        </form>
        <span className="">- OR -</span>
        <h1>
          Already Have Account
          <Link className="underline ml-4" href="/login">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
}
