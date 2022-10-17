import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaBone } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="fluid-container px-7 py-20 overflow-hidden">
      <div className="flex flex-col gap-8">
        {/* Footer Nav */}
        <div className="flex place-self-center gap-x-20">
          <Link href="/">
            <a className="text-gray-500">Home</a>
          </Link>
          <Link href="/">
            <a className="text-gray-500">About</a>
          </Link>
          <Link href="/">
            <a className="text-gray-500">Paper</a>
          </Link>
        </div>
        {/* Footer message */}
        <p className="text-gray-900 text-center px-10">
          This is part of an on-going research paper by Elizalde, Rubinos, and
          Taleon for West Visayas State University - College of Information and
          Communications Technology.
          <br />
          All Rights Reserved.
        </p>
        {/* Logos */}
        <div className="flex place-self-center gap-x-20">
          <Image
            width={112}
            height={112}
            src="https://raw.githubusercontent.com/wvsu-cict-code/cict-logo/0985c71c5d6e1c6caac1f04250c7a02f7efb395b/default.svg"
          />
          <Image
            width={112}
            height={112}
            src="https://raw.githubusercontent.com/wvsu-cict-code/cict-logo/master/wvsu-big-logo.png"
          />
        </div>
      </div>
    </footer>
  );
};
// const Footer = () => {
//   return (
//     <footer className=" bg-gray-900">
//       <div className="py-14 px-7 max-w-5xl mx-auto flex flex-col gap-y-5">
//         {/* Logo section */}
//         <div className="flex flex-col items-center">
//           <FaBone className="text-white mb-2" size="2rem" />
//           <h1 className="text-white text-2xl font-extrabold">ScolioVis</h1>
//           <p className="text-gray-200 text-sm text-center max-w-lg">
//             <b>ScolioVis</b> is a web app that uses computer vision and machine
//             learning to automatically measure the Cobb Angle on Spine X-Ray
//             images.
//           </p>
//         </div>
//         <p className="text-xs text-gray-400 text-center">
//           This app is created by Elizalde, Rubinos, and Taleon as part of an
//           unpublished Thesis at WVSU-CICT. It is not yet medically approved.
//         </p>
//         <p className="text-sm text-gray-400 text-center">© 2022 WVSU-CICT</p>
//       </div>
//     </footer>
//   );
// };

export default Footer;
