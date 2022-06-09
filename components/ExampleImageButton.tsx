import React, { Dispatch, SetStateAction } from "react";
import { imageUploadToasts } from "../services/customToasts";
import urlToSelectedFile from "../services/urlToSelectedFile";

type ExampleImageButtonProps = {
  setFile: Dispatch<SetStateAction<SelectedFile | undefined>>;
  exampleImageURL: string;
};
const ExampleImageButton: React.FC<ExampleImageButtonProps> = ({
  setFile,
  exampleImageURL,
}) => {
  async function tryWithExample(exampleImageURL: string) {
    const f = await urlToSelectedFile(exampleImageURL);
    setFile(f);
    imageUploadToasts.success();
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
      className="w-20 h-20 rounded-md hover:opacity-70"
    ></button>
  );
};

export default ExampleImageButton;
