import React, { useState } from "react";

// calc((124px/4)*0

interface IMultiSwitchProps {
  currentIndex: number;
  onChange?: (clickedIndex: number) => void;
}
const MultiSwitch: React.FC<IMultiSwitchProps> = ({
  currentIndex,
  onChange,
}) => {
  return (
    <div className="relative flex gap-x-1 text-gray-600 border self-start rounded-lg bg-gray-200 p-0.5 border-gray-300">
      <span
        style={{
          transform: `translate(calc(100% * ${currentIndex} + 4px * ${currentIndex}), 0)`,
        }}
        className="absolute transition ease-in-out transform h-7 w-7 bg-white rounded-md shadow"
      />
      <button
        onClick={() => {
          onChange && onChange(0);
        }}
        className={`relative h-7 w-7 grid place-items-center
        ${currentIndex === 0 ? "opacity-70" : "opacity-40"}
        `}
      >
        <span
          className="h-5 w-5"
          style={{
            backgroundImage: "url(/assets/landmark-display-1.svg)",
            backgroundSize: "contain",
          }}
        />
      </button>
      <button
        onClick={() => {
          onChange && onChange(1);
        }}
        className={`relative h-7 w-7 grid place-items-center
        ${currentIndex === 1 ? "opacity-70" : "opacity-40"}
        `}
      >
        <span
          className="h-5 w-5"
          style={{
            backgroundImage: "url(/assets/landmark-display-2.svg)",
            backgroundSize: "contain",
          }}
        />
      </button>
      <button
        onClick={() => {
          onChange && onChange(2);
        }}
        className={`relative h-7 w-7 grid place-items-center
        ${currentIndex === 2 ? "opacity-70" : "opacity-40"}
        `}
      >
        <span
          className="h-5 w-5"
          style={{
            backgroundImage: "url(/assets/landmark-display-3.svg)",
            backgroundSize: "contain",
          }}
        />
      </button>
      <button
        onClick={() => {
          onChange && onChange(3);
        }}
        className={`relative h-7 w-7 grid place-items-center
        ${currentIndex === 3 ? "opacity-70" : "opacity-40"}
        `}
      >
        <span
          className="h-5 w-5"
          style={{
            backgroundImage: "url(/assets/landmark-display-4.svg)",
            backgroundSize: "contain",
          }}
        />
      </button>
    </div>
  );
};

export default MultiSwitch;
