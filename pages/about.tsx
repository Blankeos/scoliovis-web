import Footer from "components/Footer";
import Nav from "components/Nav";
import React from "react";
import { motion } from "framer-motion";

import enterAnim from "@/utils/enterAnim";

import Image from "next/image";
import Head from "components/Head";
import useRefInView from "@/hooks/useRefInView";

const AboutPage = () => {
  const [ref1, inView1] = useRefInView();
  const [ref2, inView2] = useRefInView();

  return (
    <div className="flex flex-col min-h-screen">
      <Head pageTitle="About" pagePath="about" />
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

          <motion.h2
            ref={ref1}
            {...enterAnim(0.3, inView1)}
            className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold"
          >
            Authors of ScolioVis
          </motion.h2>
          <div ref={ref2} className="grid grid-cols-2 md:grid-cols-3 gap-x-10">
            <motion.div
              {...enterAnim(0.4, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3 col-span-2 md:col-span-1"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="carlo as apex"
                  src="/assets/apexcarlo.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Carlo Antonio T. Taleon
              </h3>
            </motion.div>
            <motion.div
              {...enterAnim(0.6, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="glecy as apex"
                  src="/assets/apexglecy.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Glecy S. Elizalde
              </h3>
            </motion.div>
            <motion.div
              {...enterAnim(0.8, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="cj as apex"
                  src="/assets/apexcj.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Christopher Joseph T. Rubinos
              </h3>
            </motion.div>
          </div>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Special Thanks to
          </h2>
          <p className="text-gray-700">
            Dr. Frank I. Elijorde - Thesis Adviser
          </p>
          <p className="text-gray-700">
            Dr. Bobby D. Gerardo - Thesis Co-Adviser
          </p>
          <p className="text-gray-700">Dr. Shuo Li - SpineWeb Dataset 16</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
