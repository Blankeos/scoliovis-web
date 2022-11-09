// API stuff
import axios from "axios";

export default async function getPrediction(file: ISelectedFile) {
  let formData = new FormData();

  formData.append("image", file);

  return await axios({
    url: "http://localhost:8000/getprediction",
    method: "POST",
    headers: {
      authorization: "your token",
    },
    data: formData,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      throw err; // Display errors in POST request
    }
  );
}
