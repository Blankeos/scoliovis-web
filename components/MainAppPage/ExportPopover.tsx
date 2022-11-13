import {
  exportItemTextVariants,
  exportItemVariants,
} from "@/animations/exportAnimationVariants";
import Tippy from "@tippyjs/react";
import { motion } from "framer-motion";
import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";

// Icons
import { TiExport as ExportIcon } from "react-icons/ti";
import {
  BsFileEarmarkImage as ImageIcon,
  BsFileEarmarkPdfFill as PDFIcon,
} from "react-icons/bs";
import { AiOutlineFileJpg as JPGIcon } from "react-icons/ai";
import { MdPrint as PrintIcon } from "react-icons/md";

// Hooks
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

type ExportTag = "PDF" | "JPG" | "PNG" | "Print";
type ExportItem = {
  exportTag: ExportTag;
  onClick?: () => void;
};
const EXPORT_ICONS: { [Property in ExportTag]: JSX.Element } = {
  JPG: <JPGIcon size="1.2rem" />,
  PDF: <PDFIcon size="1.2rem" />,
  PNG: <ImageIcon size="1.2rem" />,
  Print: <PrintIcon size="1.2rem" />,
};
interface IExportPopoverProps {
  exportItems?: ExportItem[];
  htmlCanvasRef: RefObject<HTMLCanvasElement>;
}

const ExportPopover: React.FC<IExportPopoverProps> = ({
  exportItems,
  htmlCanvasRef,
}) => {
  const printableContainerRef = useRef<HTMLDivElement>(null);

  function handleDownloadImage(imageType: "png" | "jpeg") {
    // Return a function so you don't need to () => {handleDownloadImage(imageType) for onClick}
    return () => {
      // 1. Generate Date
      const date = new Date(Date.now());
      const monthDay = date
        .toLocaleString("en-us", {
          month: "long",
          day: "numeric",
        })
        .replaceAll(" ", "");
      const time = date
        .toLocaleTimeString("en-us", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        })
        .replaceAll(":", "");

      // 2. Generate Link Element and Get Canvas Element
      const imageLink = document.createElement("a");
      const canvas: HTMLCanvasElement = document.getElementById(
        "image-canvas"
      ) as HTMLCanvasElement;

      // 3. Make Link Element Downloadable and Click
      imageLink.download = `ScolioVisResult_${monthDay}_${time}.${imageType}`;
      imageLink.href = canvas.toDataURL(`image/${imageType}`, 1);
      imageLink.click();
    };
  }

  function handlePDF() {
    toast.error("Export to PDF is not available yet.");
  }

  function handlePrint() {
    toast.error("Printing is not available yet.");
  }
  // const handlePrint = useReactToPrint({
  //   documentTitle: "Scoliovis",
  //   content: () => {
  //     let imageCanvasContainer = document.getElementById(
  //       "imageCanvasContainer"
  //     );
  //     if (imageCanvasContainer) {
  //       imageCanvasContainer.className = "";
  //       let containerClone = document.createElement("div");
  //       containerClone.innerHTML = imageCanvasContainer.innerHTML;

  //       return containerClone;
  //     }
  //     return document.body;
  //   },
  // });

  exportItems = [
    { exportTag: "PDF", onClick: handlePDF },
    { exportTag: "JPG", onClick: handleDownloadImage("jpeg") },
    { exportTag: "PNG", onClick: handleDownloadImage("png") },
    {
      exportTag: "Print",
      onClick: () => {
        handlePrint();
      },
    },
  ];

  return (
    <>
      <Tippy
        appendTo={document.body}
        interactive={true}
        theme="transparent"
        trigger="click"
        animation="shift-away-subtle"
        placement="left"
        popperOptions={{
          modifiers: [
            {
              name: "flip",
              options: {
                fallbackPlacements: ["left", "right", "bottom"],
              },
            },
          ],
        }}
        offset={[0, 20]}
        content={
          <div className="relative z-20 shadow rounded-full bg-white text-primary h-12 flex items-center gap-x-5 px-5 border">
            {exportItems.map((eI, i) => (
              <Tippy
                key={i}
                theme="transparent"
                placement="top"
                animation="shift-away-subtle"
                content={<span className="text-xs">as {eI.exportTag}</span>}
              >
                <motion.button
                  initial="rest"
                  whileHover="hover"
                  className="hover:bg-blue-100 rounded-full h-9 w-9 grid place-items-center group"
                  onClick={eI.onClick || (() => null)}
                >
                  <motion.span variants={exportItemVariants}>
                    {EXPORT_ICONS[eI.exportTag]}
                  </motion.span>
                </motion.button>
              </Tippy>
            ))}
          </div>
        }
      >
        <button className="rounded-lg bg-primary text-white px-5 h-12 flex items-center gap-x-3 text-sm font-semibold">
          <ExportIcon size="1.2rem" />
          Export
        </button>
      </Tippy>
    </>
  );
};

export default ExportPopover;
