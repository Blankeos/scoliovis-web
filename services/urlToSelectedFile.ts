// Source of this code: https://stackoverflow.com/questions/62179675/how-to-convert-image-source-into-a-javascript-file-object
// ***Here is the code for converting "image source" (url) to "Base64".***
const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};

const urlToSelectedFile = async (imgUrl: string): Promise<SelectedFile> => {
  var imgExt = getUrlExtension(imgUrl);

  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], "profileImage." + imgExt, {
    type: blob.type,
  });

  return Object.assign(file, {
    preview: URL.createObjectURL(file),
  });
};

export default urlToSelectedFile;
