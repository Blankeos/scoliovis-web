import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

export interface IStoreState {
  //   States
  selectedFile?: ISelectedFile;
  drawSettings: DrawSettingsType;

  // Actions
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
  devtools((set) => ({
    selectedFile: undefined,
    drawSettings: {
      landmarkDisplayType: "no_lines",
      landmarkColor: ["#FFFFFF", "#8ED1FC"],
      landmarkSize: 7,
      lineWidth: 2,
    },
    setSelectedFile: (file) =>
      set(
        produce((state: IStoreState) => {
          state.selectedFile = file;
        })
      ),
    setLandmarkDisplayType: (displayType) =>
      set(
        produce((state: IStoreState) => {
          state.drawSettings.landmarkDisplayType = displayType;
        })
      ),
    setLandmarkSize: (size) =>
      set(
        produce((state: IStoreState) => {
          state.drawSettings.landmarkSize = size;
        })
      ),
    setLandmarkColor: ({ topColor, bottomColor }) =>
      set(
        produce((state: IStoreState) => {
          if (topColor) state.drawSettings.landmarkColor[0] = topColor;
          if (bottomColor) state.drawSettings.landmarkColor[1] = bottomColor;
        })
      ),
  }))
);
