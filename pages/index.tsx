import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { IoIosImages as ImageIcon } from "react-icons/io";
import ImageUploadBox from "../components/ImageUploadBox";
import UploadIcon from "../components/UploadIcon";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow h-full">
        <div className="max-w-4xl mx-auto py-7 px-5">
          <div className="bg-gradient-to-bl from-[#87fce8] to-[#abb7e5] rounded-full mx-auto w-20 h-20 p-4 mb-3">
            <div className="w-full h-full relative tranform rotate-45">
              <Image
                src="/spine.png"
                layout="fill"
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-center text-2xl mb-5 text-gray-900">
            Welcome to{" "}
            <span className="font-black bg-gradient-to-b from-[#87fce8] to-[#abb7e5] bg-clip-text text-transparent">
              ScolioVis!
            </span>
          </h1>
          <p className="text-center max-w-sm mx-auto text-gray-600 text-sm">
            ScolioVis is an automatic <b>Cobb Angle Measurement</b> tool for
            Anterior-Posterior Spine X-Rays. Get Started by Uploading Your Spine
            X-Ray image below.
          </p>
        </div>
        <ImageUploadBox />
      </main>

      <footer className="py-4 px-5 max-w-3xl mx-auto pt-10">
        <p className="text-xs text-gray-400 text-center">
          This app is created by Elizalde, Rubinos, and Taleon as part of an
          unpublished Thesis at WVSU-CICT. It is not yet medically approved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
