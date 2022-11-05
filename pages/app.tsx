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
import { BsFileEarmarkImage as ImageIcon } from "react-icons/bs";

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
import ImageUploadBox from "components/ImageUploadBox";
import enterAnim from "@/utils/enterAnim";
import ExampleImageButton from "components/ExampleImageButton";
import getLandmarks from "services/getLandmarks";
import Image from "next/image";

const DISPLAY_TYPES: LandmarkDisplayType[] = [
  "no_lines",
  "top_lines",
  "bottom_lines",
  "all_lines",
];

const MainAppPage = () => {
  const selectedFile = useStore((state) => state.selectedFile);
  const drawSettings = useStore((state) => state.drawSettings);
  const setLandmarkSize = useStore((state) => state.setLandmarkSize);
  const setLandmarkColor = useStore((state) => state.setLandmarkColor);
  const setLandmarkDisplayType = useStore(
    (state) => state.setLandmarkDisplayType
  );
  const setScoliovisAPIResponse = useStore(
    (state) => state.setScoliovisAPIResponse
  );
  const scolioVisAPIResponse = useStore((state) => state.scoliovisAPIResponse);

  async function fetchData(file: ISelectedFile) {
    sdInformer.start();
    setScoliovisAPIResponse();
    setLoading(true);
    try {
      const res: any = await getLandmarks(file);
      setScoliovisAPIResponse(res.data);
      console.log(res.data);
      // console.log(response.data);
      // setSegmentationResponse(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    sdInformer.cancel();
  }

  //   Hooks
  useEffect(() => {
    if (!selectedFile) return;
    fetchData(selectedFile);
  }, [selectedFile]);

  const sdInformer = useServerDelayInformer();
  const [segmentationResponse, setSegmentationResponse] =
    useState<ISegmentationResponse>();

  // States
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAngle, setShowAngle] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Head pageTitle="Main App" pagePath="app" />
      <nav className="absolute z-20 grid grid-cols-5 p-3">
        <div className="col-span-1 flex justify-start h-12">
          <Link href="/">
            <a className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-primary hover:border-primary hover:text-white hover:shadow-md transition bg-white bg-opacity-50">
              <ArrowIcon size="1.2rem" />
              <span>Back</span>
            </a>
          </Link>
        </div>
        {/* <div className="flex items-center col-span-3 justify-center">
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
        <div className="col-span-1" /> */}
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
            {selectedFile ? (
              <ImageCanvas />
            ) : (
              <div className="h-full relative flex flex-col">
                <ImageUploadBox file={selectedFile} bgClass="bg-gray-100" />
                <div className="fluid-container p-7 flex flex-col items-center gap-y-5 overflow-hidden">
                  <motion.p
                    {...enterAnim(0.2)}
                    className="flex gap-x-2 items-center text-gray-500 text-sm"
                  >
                    <ArrowIcon className="-rotate-90" />
                    Or try with these example spine images
                  </motion.p>
                  <motion.div {...enterAnim(0.3)} className="flex gap-5">
                    <ExampleImageButton
                      exampleImageURL="/example_images/1.jpg"
                      routeToApp={false}
                    />
                    <ExampleImageButton
                      exampleImageURL="/example_images/2.jpg"
                      routeToApp={false}
                    />
                    <ExampleImageButton
                      exampleImageURL="/example_images/3.jpg"
                      routeToApp={false}
                    />
                    <ExampleImageButton
                      exampleImageURL="/example_images/4.jpg"
                      routeToApp={false}
                    />
                  </motion.div>
                </div>
              </div>
            )}
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
            <p className="truncate text-gray-500 text-xs flex gap-x-1">
              <ImageIcon className="transform translate-y-0.5" />
              <span>{selectedFile && selectedFile.name}</span>
            </p>
          </div>
          <hr />
          {!loading && scolioVisAPIResponse && (
            <>
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
                {/* <ObjectDetectionIcon /> */}
                <span>Detection Display</span>
              </h2>
              <hr />
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
                {/* <LandmarkEstimationIcon /> */}
                <span>Landmark Display</span>
              </h2>
              <MultiSwitch
                currentIndex={currentIndex}
                onChange={(indexClicked) => {
                  setCurrentIndex((prev) => {
                    setLandmarkDisplayType(DISPLAY_TYPES[indexClicked]);
                    return indexClicked;
                  });
                }}
              />
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
            </>
          )}
          {loading && (
            <div className="flex flex-col justify-center h-full gap-y-5">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -12 }}
                transition={{
                  yoyo: Infinity,
                  duration: 0.5,
                }}
                className="flex justify-center"
              >
                <Image
                  src="/assets/apexglass.png"
                  width={150}
                  height={150}
                  objectFit="contain"
                />
              </motion.div>
              <p className="text-center text-xs text-gray-600 px-4">
                <b>Apex</b> is currently sending your spine to the server.
                Please wait a while...
              </p>
            </div>
          )}
          {!loading && !scolioVisAPIResponse && (
            <div className="flex flex-col justify-center h-full gap-y-5">
              <div className="flex justify-center transform translate-x-3">
                <Image
                  src="/assets/apexcrying.png"
                  width={150}
                  height={150}
                  objectFit="contain"
                />
              </div>
              <p className="text-center text-xs text-gray-600 px-4">
                <span className="text-red-500">The server did not respond</span>{" "}
                so the request failed. <b>Apex</b> is sorry! 😢
              </p>
              <button
                className="text-sm hover:text-primary transition"
                onClick={() => {
                  if (!selectedFile) return;
                  fetchData(selectedFile);
                }}
              >
                Try again?
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainAppPage;
