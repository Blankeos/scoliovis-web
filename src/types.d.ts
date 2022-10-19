interface ISelectedFile extends File {
  preview: string;
}

// Custom Type for a React functional component with props AND CHILDREN
// Source: https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc/71800185#71800185 solution by ashuvssut
// Import syntax in d.ts files: https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
type FCC<P = {}> = import("react").FC<import("react").PropsWithChildren<P>>;

// Temporary Segmentation Response Type
interface ISegmentationResponse {
  encoded_img: string;
  filename: string;
  name: string;
}
