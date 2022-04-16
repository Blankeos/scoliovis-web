import React, { useState } from "react";

// Icons
import PolygonIcon from "./PolygonIcon";
import UploadIcon from "./UploadIcon";

// Hooks
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface SelectedFile extends File {
  preview: string;
}

const ImageUploadBox = () => {
  const [file, setFile] = useState<SelectedFile | undefined>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      toast.success(`Successfully chose image!`);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    onDropRejected: (fileRejection) => {
      toast.error("Can't accept this file type.");
    },
  });

  return (
    <>
      <input {...getInputProps()} />
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <label
          {...getRootProps()}
          className="h-72 w-full bg-gray-200 rounded-md text-gray-400 cursor-pointer border border-gray-300 hover:shadow-inner transition relative overflow-hidden"
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
              className={`w-full h-full flex justify-center items-center flex-col gap-5 transition ${
                file
                  ? isDragActive
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-100"
              } group-hover:opacity-100`}
            >
              <UploadIcon />
              <span>
                <b className="font-semibold">Choose an image</b> or drag it
                here.
              </span>
            </div>
          </div>
        </label>
        <p className="text-xs my-3 text-gray-400 w-full text-center truncate">
          {file ? file.name : <span className="invisible">.</span>}
        </p>
        <button
          disabled={file ? false : true} // file ? (exists) : (doesn't exist)
          className="flex items-center px-5 w-full py-2 rounded-md text-white border font-medium text-sm bg-gray-800 disabled:opacity-80 transition disabled:text-gray-300 disabled:bg-transparent"
        >
          <PolygonIcon />
          <span className="text-center w-full">Measure Cobb Angle</span>
        </button>
      </div>
    </>
  );
};

//  bg-gradient-to-bl from-[#87fce8] to-[#abb7e5]

export default ImageUploadBox;
