import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

export interface IStoreState {
  //   States
  selectedFile?: ISelectedFile;
  bears: number;
  // Actions
  setSelectedFile: (file?: ISelectedFile) => void;
  increase: (by: number) => void;
}

export const useStore = create<IStoreState>()(
  devtools((set) => ({
    selectedFile: undefined,
    bears: 0,
    setSelectedFile: (file) =>
      set(
        produce((state: IStoreState) => {
          state.selectedFile = file;
        })
      ),
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  }))
);
