import Head from "components/Head";
import Link from "next/link";

import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

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

import { HiArrowsPointingOut as LandmarkDisplayTypeIcon } from "react-icons/hi2";

import { TbAngle as CobbAngleIcon } from "react-icons/tb";

import { RiEyeLine as ViewDetailsIcon } from "react-icons/ri";
import { MdBugReport as BugIcon } from "react-icons/md";
import { HiChatAlt as SupportIcon } from "react-icons/hi";
import { TbFaceIdError as APIErrorIcon } from "react-icons/tb";
import useServerDelayInformer from "@/hooks/useServerDelayInformer";
import uploadFile from "services/uploadFile";

import Tippy from "@tippyjs/react";
import { useStore } from "store";
import ImageUploadBox from "components/ImageUploadBox";
import PolygonIcon from "components/PolygonIcon";
import Image from "next/image";
import { motion } from "framer-motion";
const MainAppPage = () => {
  const selectedFile = useStore((state) => state.selectedFile);

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
        <div className="flex-grow p-3 bg-gray-200">
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative max-w-4xl h-full w-full mx-auto"
          >
            <Image
              alt="spine image"
              src={`${selectedFile?.preview}`}
              layout="fill"
              objectFit="contain"
            />
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
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <ObjectDetectionIcon /> */}
            <span>Detection Display</span>
          </h2>
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <LandmarkEstimationIcon /> */}
            <span>Landmark Display</span>
          </h2>
          <div className="flex gap-x-1 text-gray-600 border self-start rounded-lg bg-gray-200">
            <button className="h-7 w-7 border grid place-items-center rounded-lg border-white bg-white">
              <LandmarkDisplayTypeIcon />
            </button>
            <button className="h-7 w-7 grid place-items-center">
              <LandmarkDisplayTypeIcon />
            </button>
            <button className="h-7 w-7 grid place-items-center">
              <LandmarkDisplayTypeIcon />
            </button>
            <button className="h-7 w-7 grid place-items-center">
              <LandmarkDisplayTypeIcon />
            </button>
          </div>
          <div className="h-7 w-7 border bg-primary rounded-lg"></div>
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold mt-3">
            {/* <CobbAngleIcon /> */}
            <span>Cobb Angle Display</span>
          </h2>
          <div className="flex gap-x-4 text-sm cursor-pointer items-center self-start">
            <div className="border rounded-lg w-14 p-0.5 bg-gray-200 border-gray-300">
              <div className="h-6 w-6 bg-white shadow rounded-md" />
            </div>
            <span>Show Angle</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainAppPage;
