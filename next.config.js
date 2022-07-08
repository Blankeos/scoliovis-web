/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    uploadFileAPI: "http://localhost:8000/v2/uploadfile",
  },
};

module.exports = nextConfig;
