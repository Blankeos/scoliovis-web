import React from "react";

import { FaBone } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bg-gray-900">
      <div className="py-14 px-7 max-w-5xl mx-auto flex flex-col gap-y-5">
        {/* Logo section */}
        <div className="flex flex-col items-center">
          <FaBone className="text-white mb-2" size="2rem" />
          <h1 className="text-white text-2xl font-extrabold">ScolioVis</h1>
          <p className="text-gray-200 text-sm text-center max-w-lg">
            <b>ScolioVis</b> is a web app that uses computer vision and machine
            learning to automatically measure the Cobb Angle on Spine X-Ray
            images.
          </p>
        </div>
        <p className="text-xs text-gray-400 text-center">
          This app is created by Elizalde, Rubinos, and Taleon as part of an
          unpublished Thesis at WVSU-CICT. It is not yet medically approved.
        </p>
        <p className="text-sm text-gray-400 text-center">© 2022 WVSU-CICT</p>
      </div>
    </footer>
  );
};

export default Footer;
