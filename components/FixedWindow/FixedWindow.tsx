import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

// Icons
import {
  FiArrowLeft as ArrowIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import { RiEyeLine as ViewDetailsIcon } from "react-icons/ri";
import { MdBugReport as BugIcon } from "react-icons/md";
import { HiChatAlt as SupportIcon } from "react-icons/hi";

import Switch from "../Switch";
import ImageUploadBox from "../ImageUploadBox";
import Dropdown from "../Dropdown";
import Tippy from "@tippyjs/react";

type FixedWindowProps = {
  file?: SelectedFile;
  isShowing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
  setFile: Dispatch<SetStateAction<SelectedFile | undefined>>;
};

const FixedWindow: React.FC<FixedWindowProps> = ({
  isShowing,
  setShowing,
  file,
  setFile,
}) => {
  function closeModal() {
    setShowing(false);
  }

  //   Hooks
  const [enabled, setEnabled] = useState<boolean>(true);
  useEffect(() => {
    if (file !== undefined) {
      //   File is not undefined, we can upload the file
      console.log("File is not null, we can upload.");
      setShowing(true);
    } else {
      console.log("File is null, we can't upload.");
    }
  }, [file]);

  return (
    <Transition appear show={isShowing} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        {/* Actual Body of the Dialog is within Dialog.Panel */}
        <div className="fixed inset-0 overflow-y-auto bg-white z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 will-change"
            enterFrom="scale-95"
            enterTo="scale-100"
            leave="ease-in duration-200 will-change"
            leaveFrom="scale-100"
            leaveTo="scale-95"
          >
            {/* CONTENT OF THE WINDOW IS HERE!! */}
            <div className="w-full h-full transform overflow-hidden bg-white p-6 transition-all flex flex-col ">
              {/* Nav */}
              <nav className="flex gap-5 justify-between h-12 text-gray-800 flex-shrink-0">
                <div className="h-full">
                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      closeModal();
                    }}
                    className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-blue-700 hover:text-white hover:shadow-md"
                  >
                    <ArrowIcon size="1.2rem" />
                    <span>Start New</span>
                  </button>
                </div>
                <div className="h-full flex gap-8">
                  <div className="self-center flex items-center gap-x-2">
                    <Tippy content="View Details">
                      <button
                        type="button"
                        onClick={() => setEnabled((prev) => !prev)}
                      >
                        <ViewDetailsIcon
                          className="text-center text-gray-800"
                          size="1.5rem"
                        />
                      </button>
                    </Tippy>
                    <Switch enabled={enabled} setEnabled={setEnabled} />
                  </div>
                  <Dropdown
                    className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-blue-700 hover:text-white hover:shadow-md text-gray-800"
                    openClass="bg-blue-700 text-white"
                    items={[
                      { label: "Report a Bug", Icon: BugIcon },
                      { label: "Contact Support", Icon: SupportIcon },
                    ]}
                  >
                    <SettingsIcon size="1.2rem" />
                  </Dropdown>
                </div>
              </nav>
              <main className="w-full flex-grow grid grid-cols-3 gap-8 overflow-hidden">
                {/* COL 1 */}
                <div className="flex flex-col overflow-hidden">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Input Spine Image
                    </h1>
                  </div>
                  {file ? (
                    <div className="relative flex-grow flex justify-center items-center border-2 border-dashed rounded-xl overflow-hidden">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300 will-change"
                        enterFrom="scale-50"
                        enterTo="scale-100"
                        leave="ease-in duration-200 will-change"
                        leaveFrom="scale-100"
                        leaveTo="scale-50"
                      >
                        <img
                          src={`${file.preview}`}
                          className="object-contain w-11/12 h-5/6"
                        />
                      </Transition.Child>
                    </div>
                  ) : (
                    <>
                      <div className="w-full h-full flex">
                        <ImageUploadBox file={file} setFile={setFile} />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Vertebral Segmentation
                    </h1>
                  </div>
                  <div className="flex-grow flex items-center border-2 border-dashed justify-center rounded-xl">
                    IMAGE HERE
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Cobb Angle Measurement
                    </h1>
                  </div>
                  <div className="flex-grow flex items-center border-2 border-dashed justify-center rounded-xl">
                    IMAGE HERE
                  </div>
                </div>
              </main>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FixedWindow;

{
  /* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div> */
}
