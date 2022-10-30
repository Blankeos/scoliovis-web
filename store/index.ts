import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import produce from "immer";

export interface IStoreState {
  //   States
  selectedFile?: ISelectedFile;
  drawSettings: DrawSettingsType;
  scoliovisAPIResponse?: ScolioVisAPIResponseType;

  // Actions
  setScoliovisAPIResponse: (responseData?: ScolioVisAPIResponseType) => void;
  setSelectedFile: (file?: ISelectedFile) => void;
  setLandmarkDisplayType: (displayType: LandmarkDisplayType) => void;
  setLandmarkSize: (size: number) => void;
  setLandmarkColor: ({
    topColor,
    bottomColor,
  }: {
    topColor?: string;
    bottomColor?: string;
  }) => void;
}

export const useStore = create<IStoreState>()(
  devtools(
    immer((set) => ({
      selectedFile: undefined,
      drawSettings: {
        landmarkDisplayType: "no_lines",
        landmarkColor: ["#FFFFFF", "#8ED1FC"],
        landmarkSize: 7,
        lineWidth: 2,
      },
      scoliovisAPIResponse: undefined,
      setScoliovisAPIResponse: (responseData) =>
        set((state) => {
          state.scoliovisAPIResponse = responseData;
        }),
      setSelectedFile: (file) =>
        set((state) => {
          // I added 'any' just to make the typescript compiler happy.
          // Issue is with the HTMLImageElement type not being compatible with WriteableDraft).
          // It's too deep to fix, but this works anyway)
          state.selectedFile = file as any;
        }),
      setLandmarkDisplayType: (displayType) =>
        set((state) => {
          state.drawSettings.landmarkDisplayType = displayType;
        }),
      setLandmarkSize: (size) =>
        set((state) => {
          state.drawSettings.landmarkSize = size;
        }),
      setLandmarkColor: ({ topColor, bottomColor }) =>
        set((state) => {
          if (topColor) state.drawSettings.landmarkColor[0] = topColor;
          if (bottomColor) state.drawSettings.landmarkColor[1] = bottomColor;
        }),
    }))
  )
);

// export const useStore = create<IStoreState>()(
//   devtools((set) => ({
//     selectedFile: undefined,
//     drawSettings: {
//       landmarkDisplayType: "no_lines",
//       landmarkColor: ["#FFFFFF", "#8ED1FC"],
//       landmarkSize: 7,
//       lineWidth: 2,
//     },
//     scoliovisAPIResponse: undefined,
//     setScoliovisAPIResponse: (responseData) =>
//       set(
//         produce((state: any) => {
//           state.scoliovisAPIResponse = responseData;
//         })
//       ),
//     setSelectedFile: (file) =>
//       set(
//         produce((state: any) => {
//           state.selectedFile = file;
//         })
//       ),
//     setLandmarkDisplayType: (displayType) =>
//       set(
//         produce((state: any) => {
//           state.drawSettings.landmarkDisplayType = displayType;
//         })
//       ),
//     setLandmarkSize: (size) =>
//       set(
//         produce((state: any) => {
//           state.drawSettings.landmarkSize = size;
//         })
//       ),
//     setLandmarkColor: ({ topColor, bottomColor }) =>
//       set(
//         produce((state: any) => {
//           if (topColor) state.drawSettings.landmarkColor[0] = topColor;
//           if (bottomColor) state.drawSettings.landmarkColor[1] = bottomColor;
//         })
//       ),
//   }))
// );
