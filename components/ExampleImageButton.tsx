import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useStore } from "store";
import { imageUploadToasts } from "../src/utils/customToasts";
import urlToSelectedFile from "../src/utils/urlToSelectedFile";

type ExampleImageButtonProps = {
  exampleImageURL: string;
  routeToApp?: boolean;
};
const ExampleImageButton: React.FC<ExampleImageButtonProps> = ({
  exampleImageURL,
  routeToApp = true,
}) => {
  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const router = useRouter();

  async function tryWithExample(exampleImageURL: string) {
    const f = await urlToSelectedFile(exampleImageURL);
    setSelectedFile(f);
    imageUploadToasts.success();
    routeToApp && router.push("/app");
  }
  return (
    <button
      style={{
        backgroundImage: `url(${exampleImageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      type="button"
      onClick={() => tryWithExample(exampleImageURL)}
      className="w-16 h-16 md:w-20 md:h-20 rounded-md hover:opacity-70"
    ></button>
  );
};

export default ExampleImageButton;
