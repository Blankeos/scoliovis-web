import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { animateScroll as scroll } from "react-scroll";
// nav className="sticky top-0 bg-white z-20 backdrop-blur-sm bg-opacity-80"

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="">
      <div className="fluid-container py-7 px-9 w-full overflow-hidden">
        <div className="flex justify-between gap-x-8">
          {router.pathname === "/" ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollToTop();
              }}
              className="text-2xl text-primary cursor-pointer"
            >
              <span className="font-black">Scolio</span>Vis
            </a>
          ) : (
            <Link href="/">
              <a className="cursor-pointer">
                <h1 className="text-2xl text-primary">
                  <span className="font-black">Scolio</span>Vis
                </h1>
              </a>
            </Link>
          )}
          <ul className="flex gap-x-8 overflow-hidden">
            <li>
              <Link href="/about">
                <a className="text-gray-500 text-sm">About</a>
              </Link>
            </li>
            <li>
              <Link href="/paper">
                <a className="text-gray-500 text-sm">Paper</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
