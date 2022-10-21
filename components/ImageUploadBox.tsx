import React, { useEffect, useState } from "react";

// Icons
import PolygonIcon from "./PolygonIcon";
import UploadIcon from "./UploadIcon";
import { CgSpinner as SpinnerIcon } from "react-icons/cg";

// Hooks
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { imageUploadToasts } from "../services/customToasts";
import { useStore } from "store";

type ImageUploadBoxProps = {
  file: ISelectedFile | undefined;
  onSuccess?: () => void;
};
const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  file,
  onSuccess = () => {},
}) => {
  const setSelectedFile = useStore((state) => state.setSelectedFile);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      imageUploadToasts.success();
      setSelectedFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      onSuccess();
    },
    onDropRejected: (fileRejection) => {
      imageUploadToasts.error();
    },
  });
  return (
    <>
      <input {...getInputProps()} />
      <label
        {...getRootProps()}
        className="h-full w-full bg-gray-200 rounded-xl text-gray-400 cursor-pointer border border-gray-300 hover:shadow-inner transition relative overflow-hidden"
        style={{
          backgroundImage: `url('${file?.preview}')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`group absolute inset-0 transition bg-gray-900 ${
            isDragActive ? "bg-opacity-80" : "bg-opacity-0"
          } hover:bg-opacity-70`}
        >
          <div
            className={`w-full h-full flex justify-center items-center flex-col gap-5 transition group-hover:opacity-100 text-center p-8 ${
              file
                ? isDragActive
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-100"
            } `}
          >
            <UploadIcon />
            <span>
              <b className="font-semibold">Upload a spine x-ray image</b> or
              drag it here.
            </span>
          </div>
        </div>
      </label>
      {/* <p className="text-xs my-3 text-gray-400 w-full text-center truncate">
          {file ? file.name : <span className="invisible">.</span>}
        </p>
        <button
          onClick={handleUpload}
          disabled={loading || (file ? false : true)} // file ? (exists) : (doesn't exist)
          className="flex items-center px-5 w-full h-16 rounded-md text-white border font-medium text-sm bg-gray-800 disabled:opacity-80 transition disabled:text-gray-300 disabled:bg-transparent"
        >
          {loading ? (
            <SpinnerIcon size="2rem" className="animate-spin" />
          ) : (
            <PolygonIcon />
          )}
          <span className="text-center w-full">
            {loading ? "Measuring Cobb Angle..." : "Measure Cobb Angle"}
          </span>
        </button> */}
    </>
  );
};

//  bg-gradient-to-bl from-[#87fce8] to-[#abb7e5]

export default ImageUploadBox;
