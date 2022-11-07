import enterAnim from "@/utils/enterAnim";
import Footer from "components/Footer";
import Head from "components/Head";
import Nav from "components/Nav";
import { motion } from "framer-motion";
import { NextPage } from "next";
import React from "react";

const PaperPage: NextPage = () => (
  <div className="flex flex-col min-h-screen">
    <Head pageTitle="Paper" pagePath="paper" />
    <Nav />
    <main className="flex-grow h-full">
      <div className="w-full max-w-xl mx-auto px-9">
        <motion.div
          {...enterAnim()}
          className="bg-gradient-to-br from-purple-500 to-primary w-full h-64 rounded-2xl mb-20"
        ></motion.div>
        <motion.h1 {...enterAnim(0.1)} className="text-6xl font-extrabold mb-6">
          Paper
        </motion.h1>
        <motion.p {...enterAnim(0.2)}>
          Our manuscript is still in progress...
        </motion.p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PaperPage;
