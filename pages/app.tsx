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
import Image from "next/image";
import getPrediction from "services/getPrediction";

import usePanZoom from "use-pan-and-zoom";

const DISPLAY_TYPES: LandmarkDisplayType[] = [
  "no_lines",
  "top_lines",
  "bottom_lines",
  "all_lines",
];

const MainAppPage = () => {
  const selectedFile = useStore((state) => state.selectedFile);
  const scolioVisAPIResponse = useStore((state) => state.scoliovisAPIResponse);

  // Draw Settings
  const drawSettings = useStore((state) => state.drawSettings);
  const setLandmarkSize = useStore((state) => state.setLandmarkSize);
  const setLandmarkColor = useStore((state) => state.setLandmarkColor);
  const setLandmarkDisplayType = useStore(
    (state) => state.setLandmarkDisplayType
  );
  const setScoliovisAPIResponse = useStore(
    (state) => state.setScoliovisAPIResponse
  );
  const setShowDetections = useStore((state) => state.setShowDetections);
  const setShowLandmarks = useStore((state) => state.setShowLandmarks);
  const setShowCobbAngle = useStore((state) => state.setShowCobbAngle);
  const setDetectionsScale = useStore((state) => state.setDetectionsScale);
  const setShowDetectionLabels = useStore(
    (state) => state.setShowDetectionLabels
  );

  async function fetchData(file: ISelectedFile) {
    sdInformer.start();
    setScoliovisAPIResponse();
    setLoading(true);
    try {
      const res: any = await getPrediction(file);
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

  const { transform, setContainer, panZoomHandlers } = usePanZoom({
    zoomSensitivity: 0.001,
  });

  return (
    <div className="relative flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Head pageTitle="Main App" pagePath="app" />
      <nav className="absolute grid grid-cols-5 p-3">
        <div className="col-span-1 flex justify-start h-12">
          <Link href="/">
            <a className="relative z-20 flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-primary hover:border-primary hover:text-white hover:shadow-md transition bg-white bg-opacity-50">
              <ArrowIcon size="1.2rem" />
              <span>Back</span>
            </a>
          </Link>
        </div>
      </nav>
      <main className="min-h-screen max-h-screen flex flex-col sm:flex-row bg-gray-300 overflow-hidden">
        {/* === MAIN SECTION === */}
        {selectedFile && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            ref={(el) => setContainer(el)}
            {...panZoomHandlers}
            style={{ touchAction: "none" }}
            className="flex-1 flex bg-opacity-50 p-3 shadow-inner cursor-grab active:cursor-grabbing overflow-hidden"
          >
            <div
              style={{ transform }}
              className="flex flex-col relative max-w-4xl w-full mx-auto"
            >
              <ImageCanvas />
            </div>
          </motion.div>
        )}
        {!selectedFile && (
          <div className="flex-1 flex bg-opacity-50 p-3 shadow-inner cursor-grab active:cursor-grabbing overflow-hidden">
            <div className="relative flex flex-col max-w-2xl w-full mx-auto">
              <ImageUploadBox file={selectedFile} bgClass="bg-gray-100" />
              <div className="fluid-container p-7 flex flex-col items-center gap-y-5">
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
          </div>
        )}
        {/* === SIDE BAR === */}
        <div className="order-first sm:order-last bg-white shadow-xl flex flex-col overflow-y-auto sm:max-w-xs w-full p-3 gap-y-3">
          <h1 className="text-lg text-primary text-center">
            <span className="font-black">Scolio</span>Vis
          </h1>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
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
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showDetections}
                  setEnabled={setShowDetections}
                />
                <ObjectDetectionIcon />
                <span>Detection Display</span>
              </h2>
              {drawSettings.showDetections && (
                <div className="flex flex-col gap-y-0.5">
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <div className="flex justify-start">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        id="showDetectionLabels"
                        checked={drawSettings.showDetectionLabels}
                        onChange={(e) => {
                          setShowDetectionLabels(e.target.checked);
                          // e.target.checked
                        }}
                      />
                    </div>
                    <label
                      htmlFor="showDetectionLabels"
                      className="cursor-pointer select-none text-xs"
                    >
                      Show Detection Labels
                    </label>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs truncate">Scale</label>
                    <div className="h-7 select-none flex">
                      <input
                        className="cursor-grab active:cursor-grabbing"
                        type="range"
                        min="1"
                        max="4"
                        onChange={(e) => {
                          setDetectionsScale(parseInt(e.target.value));
                        }}
                        value={drawSettings.detectionsScale}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr />
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showLandmarks}
                  setEnabled={setShowLandmarks}
                />
                <LandmarkEstimationIcon />
                <span>Landmark Display</span>
              </h2>
              {drawSettings.showLandmarks && (
                <div className="flex flex-col gap-y-0.5">
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Mode</label>
                    <div className="flex">
                      <MultiSwitch
                        currentIndex={currentIndex}
                        onChange={(indexClicked) => {
                          setCurrentIndex((prev) => {
                            setLandmarkDisplayType(DISPLAY_TYPES[indexClicked]);
                            return indexClicked;
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Colors</label>
                    <div className="flex gap-x-2">
                      <Tippy
                        interactive={true}
                        trigger="click"
                        theme="transparent"
                        placement="bottom"
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
                          className="h-7 w-7 border rounded-lg cursor-pointer"
                          style={{ background: drawSettings.landmarkColor[0] }}
                        ></div>
                      </Tippy>
                      <Tippy
                        interactive={true}
                        trigger="click"
                        theme="transparent"
                        placement="bottom"
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
                          className="h-7 w-7 border rounded-lg cursor-pointer"
                          style={{ background: drawSettings.landmarkColor[1] }}
                        ></div>
                      </Tippy>
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Radius</label>
                    <div className="h-7 select-none flex">
                      <input
                        className="cursor-grab active:cursor-grabbing"
                        type="range"
                        min="0"
                        max="20"
                        onChange={(e) => {
                          setLandmarkSize(parseInt(e.target.value));
                        }}
                        value={drawSettings.landmarkSize}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr />
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showCobbAngle}
                  setEnabled={setShowCobbAngle}
                />
                <CobbAngleIcon />
                <span>Cobb Angle Display</span>
              </h2>
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
