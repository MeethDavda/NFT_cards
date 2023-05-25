// require("dotenv").config();

const key = import.meta.env.VITE_PINATA_API_KEY;
const secret = import.meta.env.VITE_PINATA_API_SECRET;
const JWT = `Bearer ${import.meta.env.VITE_PINATA_JWT_TOKEN}`;

import axios from "axios";

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_key: secret,
        Authorization: JWT,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
export const uploadFileToIPFS = async (file) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  let formData = new FormData();
  formData.append("file", file);

  const metaData = JSON.stringify({
    name: "testing",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });

  formData.append("pinataMetaData", metaData);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });

  formData.append("pinataOptions", pinataOptions);

  return axios
    .post(url, formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: key,
        pinata_secret_key: secret,
        Authorization: JWT,
      },
    })
    .then(function (response) {
      // console.log("Image Uploaded", response.data.IpfsHash);
      console.log("Image Uploaded", response.data);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
