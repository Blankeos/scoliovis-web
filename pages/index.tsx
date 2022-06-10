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
const Home: NextPage = () => {
  const [isShowing, setShowing] = useState<boolean>(false);
  const [file, setFile] = useState<SelectedFile | undefined>();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="">
        <div className="max-w-5xl mx-auto py-7 px-7 w-full">
          <div className="flex justify-center">
            <Link href="/">
              <a>
                <h1 className="font-black text-2xl text-blue-700">ScolioVis</h1>
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow h-full">
        <header className="">
          <div className="max-w-5xl mx-auto py-7 px-7 flex gap-x-16 justify-between">
            <div className="">
              <h1 className="font-extrabold text-2xl mb-5 text-gray-800 max-w-xl">
                Automatically measure the Cobb Angle on Spine X-Rays using
                Computer Vision. 👁‍🗨
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
        </header>
        <section>
          <div className="h-72 max-w-5xl w-full mx-auto px-7 flex flex-col items-center">
            <ImageUploadBox file={file} setFile={setFile} />
          </div>
          <div className="max-w-5xl w-full mx-auto p-7 flex flex-col items-center gap-y-5">
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
