import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import ImageUploadBox from "../components/ImageUploadBox";
import { useState } from "react";

// Icons
import { FiArrowRight as ArrowIcon } from "react-icons/fi";
import FixedWindow from "../components/FixedWindow/FixedWindow";
const Home: NextPage = () => {
  const [isShowing, setShowing] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="">
        <div className="max-w-5xl mx-auto py-7 px-7 w-full">
          <div className="flex justify-center">
            <h1 className="font-black text-2xl text-gray-800e">ScolioVis</h1>
          </div>
        </div>
      </nav>
      <main className="flex-grow h-full">
        <header className="">
          <div className="max-w-5xl mx-auto py-7 px-7 flex gap-x-16 justify-between">
            <div className="py-5">
              <h1 className="font-extrabold text-2xl mb-5 text-gray-800 max-w-lg">
                Automatically measure Cobb Angle on Spine X-Rays using Computer
                Vision.
              </h1>
              <p className="mb-5 text-gray-700 max-w-xl">
                ScolioVis is an automatic Cobb Angle Measurement tool for
                anterior-posterior spine X-rays. This is an ongoing thesis by
                Elizalde, Rubinos, and Taleon
              </p>
              <button
                type="button"
                onClick={() => setShowing(true)}
                className="flex gap-x-2 items-center px-5 py-3 bg-blue-700 text-white rounded-xl shadow-md text-sm"
              >
                <span>Get Started</span>
                <ArrowIcon />
              </button>
            </div>
            <div className="flex items-center">
              <div className="bg-gradient-to-bl from-[#87fce8] to-[#abb7e5] rounded-full w-52 h-52 p-4 mb-3">
                <div className="w-full h-full relative tranform rotate-45">
                  <Image
                    src="/spine.png"
                    layout="fill"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        <section>
          <ImageUploadBox />
          <div className="max-w-5xl w-full mx-auto p-7 flex flex-col items-center gap-y-5">
            <p className="flex gap-x-2 items-center text-gray-800 text-sm">
              <ArrowIcon className="rotate-90" />
              Or try with these example spine images
            </p>
            <div className="flex gap-5">
              <div className="bg-blue-500 w-20 h-20 rounded-md"></div>
              <div className="bg-blue-500 w-20 h-20 rounded-md"></div>
              <div className="bg-blue-500 w-20 h-20 rounded-md"></div>
              <div className="bg-blue-500 w-20 h-20 rounded-md"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FixedWindow isShowing={isShowing} setShowing={setShowing} />
    </div>
  );
};

export default Home;
