import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="">
      <div className="fluid-container py-7 px-9 w-full overflow-hidden">
        <div className="flex justify-between gap-x-8">
          <Link href="/">
            <a>
              <h1 className="text-2xl text-primary">
                <span className="font-black">Scolio</span>Vis
              </h1>
            </a>
          </Link>
          <ul className="flex gap-x-8 overflow-hidden">
            <li>
              <Link href="/about">
                <a className="text-gray-500 text-sm">About</a>
              </Link>
            </li>
            <li>
              <Link href="/404nothing">
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
