import React, { useState } from "react";

// calc((124px/4)*0

const MultiSwitch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="relative flex gap-x-1 text-gray-600 border self-start rounded-lg bg-gray-200 p-0.5 border-gray-300">
      <span
        style={{
          transform: `translate(calc(100% * ${currentIndex} + 4px * ${currentIndex}), 0)`,
        }}
        className="absolute transition ease-in-out transform h-7 w-7 bg-white rounded-lg shadow"
      />
      <button
        onClick={() => setCurrentIndex(0)}
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
        onClick={() => setCurrentIndex(1)}
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
        onClick={() => setCurrentIndex(2)}
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
        onClick={() => setCurrentIndex(3)}
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
