import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

// Components
import Nav from "components/Nav";
import Footer from "../components/Footer";
import ImageUploadBox from "../components/ImageUploadBox";
import FixedWindow from "../components/MainAppWindow/MainAppWindow";

import Tippy from "@tippyjs/react";

// Icons
import { FiArrowRight as ArrowIcon } from "react-icons/fi";
import ExampleImageButton from "../components/ExampleImageButton";
import { AiFillPlayCircle as PlayIcon } from "react-icons/ai";
import { followCursor } from "tippy.js";
import { motion } from "framer-motion";
import enterAnim from "@/utils/enterAnim";
import useRefInView from "@/hooks/useRefInView";
import { useStore } from "store";

const Home: NextPage = () => {
  const [isShowing, setShowing] = useState<boolean>(false);
  const selectedFile = useStore((state) => state.selectedFile);

  const [ref1, inView1] = useRefInView();
  const [ref2, inView2] = useRefInView();
  const [ref3, inView3] = useRefInView();
  const [ref4, inView4] = useRefInView();
  const [ref5, inView5] = useRefInView();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow h-full">
        <header className="">
          <div className="relative fluid-container px-9 flex flex-col overflow-hidden">
            <div className="self-center w-32 h-32 static md:absolute md:bottom-0 md:right-0 md:pb-5 md:w-auto md:h-auto">
              <Image
                alt="Apex the mascot"
                src="/assets/apex.png"
                width={180}
                height={180}
                objectFit="contain"
              />
            </div>
            <motion.h1
              {...enterAnim()}
              className="text-center text-3xl font-extrabold pt-2 pb-10 md:py-10"
            >
              Automatic{" "}
              <Tippy
                followCursor={true}
                plugins={[followCursor]}
                content="The standard measurement for scoliosis severity"
              >
                <span className="text-primary">Cobb Angle</span>
              </Tippy>
              <br />
              Measurement
            </motion.h1>
            <motion.div
              {...enterAnim(0.1)}
              className="h-48 max-w-sm w-full mx-auto px-7 flex flex-col items-center"
            >
              <ImageUploadBox file={selectedFile} />
            </motion.div>
            <div className="fluid-container p-7 flex flex-col items-center gap-y-5 overflow-hidden">
              <motion.p
                {...enterAnim(0.2)}
                className="flex gap-x-2 items-center text-gray-800 text-sm"
              >
                <ArrowIcon className="rotate-90" />
                Or try with these example spine images
              </motion.p>
              <motion.div {...enterAnim(0.3)} className="flex gap-5">
                <ExampleImageButton exampleImageURL="/example_images/1.jpg" />
                <ExampleImageButton exampleImageURL="/example_images/2.jpg" />
                <ExampleImageButton exampleImageURL="/example_images/3.jpg" />
                <ExampleImageButton exampleImageURL="/example_images/4.jpg" />
              </motion.div>
            </div>
          </div>
        </header>
        <section className="bg-primary overflow-hidden">
          <div className="fluid-container px-7 py-16 overflow-hidden">
            <div className="flex flex-col gap-y-7">
              <motion.h1
                ref={ref1}
                {...enterAnim(0, inView1)}
                className="text-white font-black text-center text-3xl"
              >
                What&apos;s ScolioVis?
              </motion.h1>
              <motion.p
                {...enterAnim(0.1, inView1)}
                className="text-gray-100 text-center"
              >
                ScolioVis is a tool for automatically measuring the Cobb
                Angle&mdash;the standard measurement to assess Scoliosis. We
                harness the power of object detection and landmark detection to
                analyze the spine and calculate the cobb angle. Here&apos;s how
                to use it.
              </motion.p>
              {/* Cards Grid */}
              <div className="grid md:grid-cols-3 gap-x-5 gap-y-5 px-2">
                {/* Card 1 */}
                <motion.div
                  ref={ref2}
                  {...enterAnim(0.1, inView2)}
                  className="relative overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center"
                >
                  <span className="block md:hidden absolute top-0 left-0 pt-8 pl-8 text-gray-300 text-2xl font-bold">
                    1
                  </span>
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      alt="input a spine image illustration"
                      src="/assets/apexfolder.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Input a Spine Image
                  </h2>
                  <p className="text-gray-500">
                    Upload a spine image, don&apos;t worry, we don&apos;t save
                    it.
                  </p>
                </motion.div>
                {/* Card 2 */}
                <motion.div
                  {...enterAnim(0.2, inView2)}
                  className="relative overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center"
                >
                  <span className="block md:hidden absolute top-0 left-0 pt-8 pl-8 text-gray-300 text-2xl font-bold">
                    2
                  </span>
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      alt="scoliovis algorithm illustration"
                      src="/assets/apexruler.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-700">
                    ScolioVis Algorithm
                  </h2>
                  <p className="text-gray-500">
                    Let our ML model and algorithm do the work for you.
                  </p>
                </motion.div>
                {/* Card 3 */}
                <motion.div
                  {...enterAnim(0.3, inView2)}
                  className="relative overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center"
                >
                  <span className="block md:hidden absolute top-0 left-0 pt-8 pl-8 text-gray-300 text-2xl font-bold">
                    3
                  </span>
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      alt="cobb angle results illustration"
                      src="/assets/apexangle.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Cobb Angle Results
                  </h2>
                  <p className="text-gray-500">
                    Get the cobb angle result along with some analysis.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          {/* Video Part (Half BG-style) */}
          <div className="relative pb-10">
            {/* Half-Bg */}
            <div className="absolute bg-white h-1/2 bottom-0 left-0 right-0"></div>
            {/* Content */}
            <div className="relative fluid-container px-9">
              <div className="grid place-items-center bg-gray-200 h-96 rounded-2xl shadow-xl">
                <PlayIcon size="5rem" className="text-primary" />
              </div>
            </div>
          </div>
        </section>
        <section className="fluid-container px-9 py-10 overflow-hidden">
          <div className="flex flex-col gap-y-8">
            <motion.h1
              ref={ref3}
              {...enterAnim(0, inView3)}
              className="font-black text-center text-3xl text-gray-800"
            >
              How good is it?
            </motion.h1>
            {/* 2-Col-Grid 1 */}
            <div className="grid grid-cols-2 gap-x-10">
              <motion.div
                {...enterAnim(0.1, inView3)}
                className="justify-self-end"
              >
                <Image
                  alt="performance illustration"
                  src="/assets/apexgrass.png"
                  width={250}
                  height={250}
                  objectFit="contain"
                />
              </motion.div>
              <motion.div {...enterAnim(0.2, inView3)} className="max-w-xs">
                <h2 className="font-bold text-2xl text-gray-800">
                  98% accuracy MAE
                </h2>
                <p className="text-gray-700">
                  Discord servers are organized into topic-based channels where
                  you can collaborate, share, and just talk about your day
                  without clogging up a group chat.
                </p>
              </motion.div>
            </div>
            {/* 2-Col-Grid 2 */}
            <div ref={ref4} className="grid grid-cols-2 gap-x-10">
              <motion.div
                {...enterAnim(0.2, inView4)}
                className="max-w-xs justify-self-end text-right"
              >
                <h2 className="font-bold text-2xl text-gray-800">
                  Experts love it!
                </h2>
                <p className="text-gray-700">
                  We conducted a usability testing and got __ in a, __ in b, __
                  in c, and __ in d.
                </p>
              </motion.div>
              <motion.div {...enterAnim(0.1, inView4)} className="">
                <Image
                  alt="usability testing illustration"
                  src="/assets/apexglass.png"
                  width={250}
                  height={250}
                  objectFit="contain"
                />
              </motion.div>
            </div>
            <motion.div
              ref={ref5}
              {...enterAnim(0.2, inView5)}
              className="mt-10 self-center"
            >
              <Link href="/">
                <a className="border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transition px-10 py-5">
                  Read the paper
                </a>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FixedWindow
        file={selectedFile}
        isShowing={isShowing}
        setShowing={setShowing}
      />
    </div>
  );
};

export default Home;
