import toast from "react-hot-toast";

const serverIsBootingUp = () => {
  const t = toast((t) => (
    <span className="grid grid-cols-2">
      <span className="text-4xl">😨</span>
      <span className="flex flex-col">
        <span className="font-bold">Model is taking too long...</span>
        <span>It's most likely because Heroku is still starting up.</span>
        <span>Please wait for a bit.</span>
        {/* <button onClick={() => toast.dismiss(t.id)}>Dismiss</button> */}
      </span>
    </span>
  ));
  return t;
};

export default serverIsBootingUp;
