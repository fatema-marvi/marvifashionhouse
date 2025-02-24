"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative w-full h-[66vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
         src="/heros.png" // Make sure this is HD (1920x1080 or higher)
         alt="Marvi Fashion House"
         width={1920}
         height={880}
         quality={100}
         className="absolute top-0 left-0 w-full h-full object-cover"
         />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4 drop-shadow-lg"
        >
          Discover Your Style with <br /> Marvi Fashion House
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg mb-6 max-w-2xl mx-auto"
        >
          Explore our exclusive collection of **men&apos;s, women&apos;s, and kid&apos;s fashion** with **premium quality and unbeatable prices**.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-mehroon-600 hover:bg-mehroon-800 transition-colors px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-lg"
          onClick={() => router.push("/women")}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
