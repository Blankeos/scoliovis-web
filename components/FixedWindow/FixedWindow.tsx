import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Icons
import {
  FiArrowLeft as ArrowIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";

type FixedWindowProps = {
  isShowing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
};

const FixedWindow: React.FC<FixedWindowProps> = ({ isShowing, setShowing }) => {
  function closeModal() {
    setShowing(false);
  }
  if (!isShowing) {
    return <></>;
  }

  return (
    <Transition appear show={isShowing} as={Fragment}>
      <Dialog
        open={isShowing}
        as="div"
        className="relative z-10"
        onClose={closeModal}
      >
        {/* Background of the Dialog */}
        {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child> */}

        {/* Actual Body of the Dialog is within Dialog.Panel */}
        <div className="fixed inset-0 overflow-y-auto bg-white bg-opacity-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 will-change"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200 will-change"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* CONTENT OF THE WINDOW IS HERE!! */}
            <Dialog.Panel className="w-full h-full transform overflow-hidden bg-white p-6 transition-all flex flex-col">
              {/* Nav */}
              <nav className="flex justify-between h-12 text-gray-800">
                <div className="h-full">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-full px-5 items-center gap-2 border rounded-md hover:bg-blue-700 hover:text-white"
                  >
                    <ArrowIcon size="1.2rem" />
                    <span>Start New</span>
                  </button>
                </div>
                <div className="h-full">
                  <button
                    type="button"
                    className="flex h-full px-5 items-center gap-2 border rounded-md hover:bg-blue-700 hover:text-white"
                  >
                    <SettingsIcon size="1.2rem" />
                  </button>
                </div>
              </nav>
              <main className="w-full flex-grow grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Input Spine Image
                    </h1>
                  </div>
                  <div className="flex-grow bg-gray-200 flex items-center justify-center rounded-md">
                    IMAGE HERE
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Vertebral Segmentation
                    </h1>
                  </div>
                  <div className="flex-grow bg-gray-200 flex items-center justify-center rounded-md">
                    IMAGE HERE
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Cobb Angle Measurement
                    </h1>
                  </div>
                  <div className="flex-grow bg-gray-200 flex items-center justify-center rounded-md">
                    IMAGE HERE
                  </div>
                </div>
              </main>
            </Dialog.Panel>
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
