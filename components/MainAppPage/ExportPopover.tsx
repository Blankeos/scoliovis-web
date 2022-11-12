import {
  exportItemTextVariants,
  exportItemVariants,
} from "@/animations/exportAnimationVariants";
import Tippy from "@tippyjs/react";
import { motion } from "framer-motion";
import React from "react";

// Icons
import { TiExport as ExportIcon } from "react-icons/ti";
import {
  BsFileEarmarkImage as ImageIcon,
  BsFileEarmarkPdfFill as PDFIcon,
} from "react-icons/bs";
import { AiOutlineFileJpg as JPGIcon } from "react-icons/ai";
import { MdPrint as PrintIcon } from "react-icons/md";

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
}

const ExportPopover: React.FC<IExportPopoverProps> = ({ exportItems }) => {
  exportItems = [
    { exportTag: "PDF" },
    { exportTag: "JPG" },
    { exportTag: "PNG" },
    { exportTag: "Print" },
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
        offset={[0, 20]}
        content={
          <div className="relative z-20 shadow rounded-full bg-white text-primary h-12 flex items-center gap-x-5 px-5 border">
            {exportItems.map((eI, i) => (
              <Tippy
                theme="transparent"
                placement="top"
                animation="shift-away-subtle"
                content={<span className="text-xs">as {eI.exportTag}</span>}
              >
                <motion.button
                  initial="rest"
                  whileHover="hover"
                  className="hover:bg-blue-100 rounded-full h-9 w-9 grid place-items-center group"
                >
                  <motion.span variants={exportItemVariants}>
                    {EXPORT_ICONS[eI.exportTag]}
                  </motion.span>
                </motion.button>
              </Tippy>
            ))}
            {/* <motion.button
              initial="rest"
              whileHover="hover"
              className="relative hover:bg-blue-100 rounded-full h-9 w-9 grid place-items-center group"
            >
              <motion.span variants={exportItemVariants}>
                <PDFIcon size="1.2rem" />
              </motion.span>
            </motion.button>
            
            <motion.button
              initial="rest"
              whileHover="hover"
              className="hover:bg-blue-100 rounded-full h-9 w-9 grid place-items-center group"
            >
              <motion.span variants={exportItemVariants}>
                <ImageIcon size="1.2rem" />
              </motion.span>
            </motion.button> */}
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
