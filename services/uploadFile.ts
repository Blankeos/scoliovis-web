// API stuff
import axios from "axios";

async function fetchUploadFile(url: string, formData: FormData) {
  return await axios({
    url: url,
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
      return err; // Display errors in POST request
    }
  );
}
export default async function uploadFile(file: SelectedFile) {
  let formData = new FormData();

  formData.append("image", file);
  formData.append("name", "Carlo Taleon");

  let result;
  try {
    result = fetchUploadFile("http://localhost:8000/uploadFile", formData);
  } catch (er) {
    console.log("Could not fetch from local API. Trying production API...");
    try {
      result = fetchUploadFile(
        "https://scoliovis-api.deta.dev/uploadFile",
        formData
      );
    } catch (err) {
      console.log("Could not fetch from production API.");
    }
  }
  return result;
}
// async function handleUpload(e: React.MouseEvent<HTMLButtonElement>) {
//     // Null check "file" state
//     if (!file) {
//       // Display that no file is selected
//       return;
//     }
//     // setLoading(true);
//     let formdata = new FormData();

//     formdata.append("image", file);
//     formdata.append("name", "Carlo Taleon");

//     await axios({
//       url: "http://localhost:8000/uploadfile",
//       method: "POST",
//       headers: {
//         authorization: "your token",
//       },
//       data: formdata,
//     }).then(
//       (res) => {
//         // Display success in POST request
//       },
//       (err) => {
//         // Display errors in POST request
//       }
//     );
//     // setLoading(false);
//   }
