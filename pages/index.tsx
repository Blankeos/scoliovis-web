import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

import Footer from "../components/Footer";
import ImageUploadBox from "../components/ImageUploadBox";

// Icons
import { FiArrowRight as ArrowIcon } from "react-icons/fi";
import FixedWindow from "../components/MainAppWindow/MainAppWindow";
import urlToSelectedFile from "../services/urlToSelectedFile";
import ExampleImageButton from "../components/ExampleImageButton";
import MyDialog from "../components/MyDialog";
import { AiFillPlayCircle as PlayIcon } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";

const Home: NextPage = () => {
  const [isShowing, setShowing] = useState<boolean>(false);
  const [file, setFile] = useState<SelectedFile | undefined>();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="">
        <div className="fluid-container py-7 px-9 w-full">
          <div className="flex justify-between gap-x-8">
            <Link href="/">
              <a>
                <h1 className="text-2xl text-primary">
                  <span className="font-black">Scolio</span>Vis
                </h1>
              </a>
            </Link>
            <ul className="flex gap-x-8">
              <li>
                <Link href="/">
                  <a className="text-gray-500 text-sm">About</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-500 text-sm">Paper</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex-grow h-full">
        {/* <header className="">
          <div className="max-w-5xl mx-auto py-7 px-7 flex gap-x-16 justify-between">
            <div className="">
              <h1 className="font-extrabold text-2xl mb-5 text-gray-800 max-w-xl">
                Automatically measure the Cobb Angle on Spine X-Rays using
                Computer Vision.
              </h1>
              <p className="mb-5 text-gray-700 max-w-xl">
                ScolioVis is an automatic Cobb Angle Measurement tool for
                anterior-posterior spine X-rays. This is an ongoing thesis by
                Elizalde, Rubinos, and Taleon.
              </p>
              <button
                type="button"
                onClick={() => setShowing(true)}
                className="flex gap-x-2 items-center px-5 py-3 bg-blue-700 hover:bg-blue-600 transition text-white rounded-xl shadow-md text-sm group"
              >
                <span>Open ScolioVis</span>
                <ArrowIcon className="group-hover:translate-x-1 transition" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="bg-gradient-to-bl to-blue-800 from-blue-600 rounded-full w-52 h-52 p-8 mb-3">
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
        </header> */}
        <header className="">
          <div className="relative fluid-container px-9">
            <h1 className="text-center text-3xl font-extrabold py-10">
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
            </h1>
            <div className="h-48 max-w-sm mx-auto px-7 flex flex-col items-center">
              <ImageUploadBox file={file} setFile={setFile} />
            </div>
            <div className="fluid-container p-7 flex flex-col items-center gap-y-5">
              <p className="flex gap-x-2 items-center text-gray-800 text-sm">
                <ArrowIcon className="rotate-90" />
                Or try with these example spine images
              </p>
              <div className="flex gap-5">
                <ExampleImageButton
                  exampleImageURL="/example_images/1.jpg"
                  setFile={setFile}
                />
                <ExampleImageButton
                  exampleImageURL="/example_images/2.jpg"
                  setFile={setFile}
                />
                <ExampleImageButton
                  exampleImageURL="/example_images/3.jpg"
                  setFile={setFile}
                />
                <ExampleImageButton
                  exampleImageURL="/example_images/4.jpg"
                  setFile={setFile}
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 pb-5">
              <Image
                src="/assets/apex.png"
                width={180}
                height={180}
                objectFit="contain"
              />
            </div>
          </div>
        </header>
        <section className="bg-primary">
          <div className="fluid-container px-7 py-16">
            <div className="flex flex-col gap-y-7">
              <h1 className="text-white font-black text-center text-3xl">
                What&apos;s ScolioVis?
              </h1>
              <p className="text-gray-100 text-center">
                ScolioVis is a tool for automatically measuring the Cobb
                Angle--the standard measurement to assess Scoliosis. We harness
                the power of object detection and landmark detection to analyze
                the spine and calculate the cobb angle. Here&apos;s how to use
                it.
              </p>
              {/* Cards Grid */}
              <div className="grid grid-cols-3 gap-x-5 px-2">
                {/* Card 1 */}
                <div className="overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center">
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      src="/assets/apexfolder.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium">Input a Spine Image</h2>
                  <p className="text-gray-600">
                    Upload a spine image, don&apos;t worry, we don&apos;t save
                    it.
                  </p>
                </div>
                {/* Card 2 */}
                <div className="overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center">
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      src="/assets/apexruler.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium">ScolioVis Algorithm</h2>
                  <p className="text-gray-600">
                    Let our ML model and algorithm do the work for you.
                  </p>
                </div>
                {/* Card 3 */}
                <div className="overflow-hidden bg-white rounded-2xl flex flex-col items-center gap-y-3 px-5 py-8 text-center">
                  <div className="h-40 w-40 rounded-full">
                    <Image
                      src="/assets/apexangle.png"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </div>
                  <h2 className="text-lg font-medium">Cobb Angle Results</h2>
                  <p className="text-gray-600">
                    Get the cobb angle result along with some analysis.
                  </p>
                </div>
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
        <section className="fluid-container px-9 py-10">
          <div className="flex flex-col gap-y-8">
            <h1 className="font-black text-center text-3xl text-gray-800">
              How good is it?
            </h1>
            {/* 2-Col-Grid 1 */}
            <div className="grid grid-cols-2 gap-x-10">
              <div className="justify-self-end">
                <Image
                  src="/assets/apexgrass.png"
                  width={250}
                  height={250}
                  objectFit="contain"
                />
              </div>
              <div className="max-w-xs">
                <h2 className="font-bold text-2xl text-gray-800">
                  98% accuracy MAE
                </h2>
                <p className="text-gray-700">
                  Discord servers are organized into topic-based channels where
                  you can collaborate, share, and just talk about your day
                  without clogging up a group chat.
                </p>
              </div>
            </div>
            {/* 2-Col-Grid 2 */}
            <div className="grid grid-cols-2 gap-x-10">
              <div className="max-w-xs justify-self-end text-right">
                <h2 className="font-bold text-2xl text-gray-800">
                  Experts love it!
                </h2>
                <p className="text-gray-700">
                  We conducted a usability testing and got __ in a, __ in b, __
                  in c, and __ in d.
                </p>
              </div>
              <div className="">
                <Image
                  src="/assets/apexglass.png"
                  width={250}
                  height={250}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="mt-10 self-center">
              <Link href="/">
                <a className="border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transition px-10 py-5">
                  Read the paper
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FixedWindow
        file={file}
        isShowing={isShowing}
        setShowing={setShowing}
        setFile={setFile}
      />
    </div>
  );
};

export default Home;
