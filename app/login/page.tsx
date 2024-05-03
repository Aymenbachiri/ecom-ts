"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState<Error>();
  const [captcha, setCaptcha] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = (target[0] as HTMLInputElement).value;
    const password = (target[1] as HTMLInputElement).value;

    try {
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res.ok) {
        throw new Error(res.error);
      }
      if (!captcha) {
        throw new Error("Captcha failed you must be a robot");
      }
      if (res.ok && captcha) {
        alert("Welcome Back");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific errors of type Error
        console.error("An error occurred:", error.message);
        setErr(error);
      } else {
        // Handle other types of errors
        console.error("An unknown error occurred:", error);
      }

      console.log(error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d23d09' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
      className="flex bg-[#ee5522] h-[85vh] dark:bg-black flex-col gap-5 items-center justify-center pt-[110px]"
    >
      <h1 className="text-4xl font-bold">Welcome</h1>
      <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          required
          className="p-4 bg-transparent border border-[#bbb] rounded-md text-xl font-bold"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-4 bg-transparent border border-[#bbb] rounded-md text-xl font-bold"
        />
        <ReCAPTCHA
          onChange={() => setCaptcha(true)}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          className="mx-auto"
        />
        <button type="submit" className="w-[300px] p-4 bg-[#ec413d] font-bold">
          Login
        </button>
        <h1 className="text-white font-bold text-2xl">
          {err && "failed to login"}{" "}
        </h1>
        <h1>
          Don&apos;t Have Account,{" "}
          <Link className="underline" href="/register">
            Register
          </Link>
        </h1>
      </form>
    </div>
  );
}
