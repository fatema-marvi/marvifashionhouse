"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "./components/hero/page";
import StitchPage from "./women/stitch/page";
import UnstitchPage from "./women/unstitch/page";
import MensPage from "./men/page";

// Reusable Section Heading with Gradient Colors & Animation
interface SectionHeadingProps {
  text: string;
  gradient: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, gradient }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-4xl font-extrabold text-center my-10 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
    >
      {text}
    </motion.h2>
  );
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div>
        <Hero />
      </div>

      {/* Stitched Section */}
      <section className="w-full flex flex-col items-center">
        <SectionHeading
          text="✨ Stitched Collection"
          gradient="text-7xl from-purple-500 via-pink-500 to-red-500 font-800"
        />
        <div className="flex flex-wrap justify-center gap-6 w-full">
          <StitchPage />
        </div>
      </section>

       {/* Unstitched Section */}
       <section className="w-full flex flex-col items-center">
        <SectionHeading
          text="🌸 Men&apos;s Collection"
          gradient="text-7xl from-green-400 via-blue-500 to-purple-600"
        />
        <div className="flex flex-wrap justify-center gap-6 w-full">
          <MensPage/>
        </div>
      </section>



      {/* Unstitched Section */}
      <section className="w-full flex flex-col items-center">
        <SectionHeading
          text="🌸 Unstitched Collection"
          gradient="text-7xl from-green-400 via-blue-500 to-purple-600"
        />
        <div className="flex flex-wrap justify-center gap-6 w-full">
          <UnstitchPage />
        </div>
      </section>

    </div>
  );
};

export default Home;
