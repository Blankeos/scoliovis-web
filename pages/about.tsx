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
            className="bg-gray-500 w-full h-64 rounded-2xl mb-20"
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
