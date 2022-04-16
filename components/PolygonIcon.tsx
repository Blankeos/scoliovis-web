import { useState } from "react";
import Lottie from "lottie-react";
import { useLottie, LottieOptions, InteractivityProps } from "lottie-react";

import animationData from "../src/lotties/polygon_lottie.json";

type PolygonIconProps = {};

const PolygonIcon: React.FC<PolygonIconProps> = () => {
  const style = {
    height: 50,
    width: 50,
  };

  return (
    <>
      <Lottie animationData={animationData} style={style} loop={true} />
    </>
  );
};

export default PolygonIcon;
