import Footer from "components/Footer";
import Nav from "components/Nav";
import React from "react";
import { motion } from "framer-motion";

import enterAnim from "@/utils/enterAnim";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">
        <div className="w-full max-w-xl mx-auto px-9">
          <motion.div
            {...enterAnim()}
            className="bg-gradient-to-br from-purple-500 to-primary w-full h-64 rounded-2xl mb-20"
          ></motion.div>
          <motion.h1
            {...enterAnim(0.1)}
            className="text-6xl font-extrabold mb-6"
          >
            About
          </motion.h1>
          <motion.p {...enterAnim(0.2)}>
            Pineapple salsa golden cayenne pepper coconut chocolate spiced
            pumpkin chili ghost pepper citrusy sesame soba noodles extra crispy
            green onions almond milk. Chili scotch bonnet pepper balsamic
            vinaigrette tart bananas Caribbean red habanero cherries blueberries
            salted walnut pesto flakes.
          </motion.p>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Authors of ScolioVis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10">
            <div className="grid grid-rows-2 justify-items-center gap-y-3 col-span-2 md:col-span-1">
              <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-400 to-primary"></div>
              <h3 className="text-center max-w-[120px]">
                Carlo Antonio T. Taleon
              </h3>
            </div>
            <div className="grid grid-rows-2 justify-items-center gap-y-3">
              <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-400 to-primary"></div>
              <h3 className="text-center  max-w-[120px]">Glecy S. Elizalde</h3>
            </div>
            <div className="grid grid-rows-2 justify-items-center gap-y-3">
              <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-400 to-primary"></div>
              <h3 className="text-center  max-w-[120px]">
                Christopher Joseph T. Rubinos
              </h3>
            </div>
          </div>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Special Thanks to
          </h2>
          <p>Dr. Frank Elijorde</p>
          <p>Dr. Bobby Gerardo</p>
          <p>Dr. Shuo Li</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
