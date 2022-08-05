import toast from "react-hot-toast";

const serverIsBootingUp = () => {
  const t = toast((t) => (
    <span className="flex gap-x-4">
      <span className="text-3xl self-center animate-pulse">😭</span>
      <span className="flex flex-col">
        <span className="font-bold mb-2 text-gray-800">
          Model is taking too long...
        </span>
        <span className="text-gray-700">
          Our <b className="font-semibold text-purple-500">Heroku</b> server
          takes a while to start up. Please wait for a bit.
        </span>
      </span>
    </span>
  ));
  return t;
};

export default serverIsBootingUp;
