import Head from "components/Head";
import Link from "next/link";

import React, { Fragment, useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";

// Icons
import {
  FiArrowLeft as ArrowIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import {
  RiSearchEyeLine as ObjectDetectionIcon,
  RiImageFill as UploadIcon,
  RiShapeFill as LandmarkEstimationIcon,
  RiCheckboxCircleLine as CheckIcon,
} from "react-icons/ri";
import // TiImage as UploadIcon,
// TiCameraOutline as ObjectDetectionIcon,
// TiFlowParallel as LandmarkEstimationIcon,
// TiTick as CheckIcon,
"react-icons/ti";

import { TbAngle as CobbAngleIcon } from "react-icons/tb";
import useServerDelayInformer from "@/hooks/useServerDelayInformer";
import uploadFile from "services/uploadFile";

import Tippy from "@tippyjs/react";
import { useStore } from "store";
import { motion } from "framer-motion";
import SmallSwitch from "components/Switch/Switch";
import MultiSwitch from "components/Switch/MultiSwitch";
import ImageCanvas from "components/MainAppPage/ImageCanvas";

import { TwitterPicker } from "react-color";

const MainAppPage = () => {
  const selectedFile = useStore((state) => state.selectedFile);
  const drawSettings = useStore((state) => state.drawSettings);
  const setLandmarkSize = useStore((state) => state.setLandmarkSize);
  const setLandmarkColor = useStore((state) => state.setLandmarkColor);

  async function fetchData(file: ISelectedFile) {
    sdInformer.start();
    setLoading(true);
    try {
      const response = await uploadFile(file);
      console.log(response.data);
      setSegmentationResponse(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    sdInformer.cancel();
  }

  //   Hooks
  const sdInformer = useServerDelayInformer();
  const [segmentationResponse, setSegmentationResponse] =
    useState<ISegmentationResponse>();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAngle, setShowAngle] = useState<boolean>(true);

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Head pageTitle="Main App" pagePath="app" />
      <nav className="grid grid-cols-5 p-3 border-b">
        <div className="col-span-1 flex justify-start">
          <Link href="/">
            <a className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-primary hover:border-primary hover:text-white hover:shadow-md transition">
              <ArrowIcon size="1.2rem" />
              <span>Back</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center col-span-3 justify-center">
          <Tippy content="1. Input Image">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-primary text-white">
              <UploadIcon size="1.7rem" />
            </div>
          </Tippy>
          <span className="w-8 h-0.5 bg-sky-100" />
          <Tippy content="2. Object Detection">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-sky-100 text-gray-500">
              <ObjectDetectionIcon size="1.7rem" />
            </div>
          </Tippy>
          <span className="w-8 h-0.5 bg-sky-100" />
          <Tippy content="3. Landmark Estimation">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-sky-100 text-gray-500">
              <LandmarkEstimationIcon size="1.7rem" />
            </div>
          </Tippy>
          <span className="w-8 h-0.5 bg-sky-100" />
          <Tippy content="4. Cobb Angle Calculation">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-sky-100 text-gray-500">
              <CobbAngleIcon size="1.7rem" />
            </div>
          </Tippy>
          <span className="w-8 h-0.5 bg-sky-100" />
          <Tippy content="5. Complete!">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-sky-100 text-gray-500">
              <CheckIcon size="1.7rem" />
            </div>
          </Tippy>
        </div>
        <div className="col-span-1" />
      </nav>
      <main className="flex-grow h-full flex overflow-y-hidden">
        {/* First Section */}
        <div className="flex-grow p-3 bg-gray-200 shadow-inner">
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative max-w-4xl h-full w-full mx-auto"
          >
            <ImageCanvas />
            {/* <Image
              alt="spine image"
              src={`${selectedFile?.src}`}
              layout="fill"
              objectFit="contain"
            /> */}
          </motion.div>
        </div>
        {/* Second Section */}
        <div className="shadow-xl flex flex-col overflow-y-auto max-w-xs w-full p-3 gap-y-2">
          <h1 className="text-lg text-primary text-center">
            <span className="font-black">Scolio</span>Vis
          </h1>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <UploadIcon /> */}
            <span>Input Image</span>
          </h2>
          <div className="text-xs flex gap-x-2 items-center">
            <button className="bg-gray-200 p-1 px-2 rounded-md">Change</button>
            <p className="truncate text-gray-500 text-xs">
              someone&apos;s spine.png
            </p>
          </div>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <ObjectDetectionIcon /> */}
            <span>Detection Display</span>
          </h2>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <LandmarkEstimationIcon /> */}
            <span>Landmark Display</span>
          </h2>
          <MultiSwitch />
          <div className="flex gap-x-2">
            <Tippy
              interactive={true}
              placement="top"
              content={
                <span>
                  <TwitterPicker
                    color={drawSettings.landmarkColor[0]}
                    colors={[
                      "#FFFFFF",
                      "#FF6900",
                      "#FCB900",
                      "#8ED1FC",
                      "#F78DA7",
                      "#7BDCB5",
                      "#00D084",
                    ]}
                    triangle="hide"
                    onChange={(color) => {
                      setLandmarkColor({
                        topColor: color.hex,
                      });
                    }}
                  />
                </span>
              }
            >
              <div
                className="h-7 w-7 border rounded-lg"
                style={{ background: drawSettings.landmarkColor[0] }}
              ></div>
            </Tippy>
            <Tippy
              interactive={true}
              placement="top"
              content={
                <span>
                  <TwitterPicker
                    color={drawSettings.landmarkColor[1]}
                    colors={[
                      "#FFFFFF",
                      "#FF6900",
                      "#FCB900",
                      "#8ED1FC",
                      "#F78DA7",
                      "#7BDCB5",
                      "#00D084",
                    ]}
                    triangle="hide"
                    onChange={(color) => {
                      setLandmarkColor({
                        bottomColor: color.hex,
                      });
                    }}
                  />
                </span>
              }
            >
              <div
                className="h-7 w-7 border rounded-lg"
                style={{ background: drawSettings.landmarkColor[1] }}
              ></div>
            </Tippy>
          </div>
          <div className="h-7">
            <input
              type="range"
              min="0"
              max="20"
              onChange={(e) => {
                setLandmarkSize(parseInt(e.target.value));
              }}
              value={drawSettings.landmarkSize}
            />
          </div>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <CobbAngleIcon /> */}
            <span>Cobb Angle Display</span>
          </h2>
          <div className="grid grid-cols-[7rem,1fr] text-sm cursor-pointer items-center self-start">
            <SmallSwitch enabled={showAngle} setEnabled={setShowAngle} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainAppPage;
