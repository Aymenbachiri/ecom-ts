"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/image-slider";

export default function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1570857502809-08184874388e?q=80&w=1756&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[700px] mt-[76px]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.h1 className="font-bold text-xl md:text-6xl text-center bg-clip-text text-gray-400 dark:text-white bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Shop with ease, shop with us!
        </motion.h1>
        <motion.h2 className="font-semibold text-md md:text-xl text-center bg-clip-text text-gray-400 dark:text-white bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Easy-to-find products.
        </motion.h2>
        <motion.p className=" text-center bg-clip-text text-gray-400 dark:text-white bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Your one-stop online destination for all your shopping needs. Discover
          a wide range of products and enjoy a seamless shopping experience from
          the comfort of your home.
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
