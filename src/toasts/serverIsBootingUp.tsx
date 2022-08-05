import toast from "react-hot-toast";

const serverIsBootingUp = () => {
  const t = toast((t) => (
    <span>
      Custom and <b>bold</b>
      <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
    </span>
  ));
  return t;
};

export default serverIsBootingUp;
