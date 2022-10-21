import React from "react";
import { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

type SwitchProps = {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};
const SmallSwitch: React.FC<SwitchProps> = ({ enabled, setEnabled }) => {
  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className="inline-flex border rounded-lg w-[3.8rem] p-0.5 bg-gray-200 border-gray-300"
      // className={`${enabled ? "bg-blue-700" : "bg-gray-300"}
      // relative inline-flex items-center h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-[26px]" : "translate-x-0"
        } h-7 w-7 bg-white shadow rounded-md transition pointer-events-none ease-in-out duration-150`}
      />
      {/* <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-6" : "translate-x-1"}
          pointer-events-none h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      /> */}
    </HeadlessSwitch>
  );
};
{
  /* <div className="border rounded-lg w-14 p-0.5 bg-gray-200 border-gray-300">
              <div className="h-6 w-6 bg-white shadow rounded-md" />
            </div> */
}
// const Switch: React.FC<SwitchProps> = ({ enabled, setEnabled }) => {
//   return (
//     <HeadlessSwitch
//       checked={enabled}
//       onChange={setEnabled}
//       className={`${enabled ? "bg-blue-700" : "bg-gray-300"}
//         relative inline-flex items-center h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
//     >
//       <span className="sr-only">Use setting</span>
//       <span
//         aria-hidden="true"
//         className={`${enabled ? "translate-x-6" : "translate-x-1"}
//           pointer-events-none h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
//       />
//     </HeadlessSwitch>
//   );
// };

export default SmallSwitch;
