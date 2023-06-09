// import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../Pinata"; //Infura made their api paid - new alternative Pinata

function Create_NFT({ marketplace, nft, account }) {
  const [fileURL, setFileURL] = useState("");
  const [formParams, setFormParams] = useState({
    name: "",
    description: "",
    price: "0.01",
  });

  // console.log(marketplace, "marketplace");

  async function uploadToIpfs(event) {
    event.preventDefault();

    var file = event.target.files[0];
    try {
      const response = await uploadFileToIPFS(file);
      if (response.success == true) {
        console.log("Image uploaded to Pinata", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("error uploading to ipfs", e);
    }
  }

  async function uploadMetaDataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success) {
        console.log("uploaded JSON to pinata: ", response);
        return response.pinataURL;
      }
    } catch (error) {
      console.log("error uploading JSON to pinata", error);
    }
  }

  async function createNFT(e) {
    e.preventDefault();
    if (!account) {
      alert("Connect to Metamask!!");
    } else {
      try {
        const metaDataURL = await uploadMetaDataToIPFS();
        console.log(metaDataURL);
        await (await nft.mint(metaDataURL)).wait();
        const id = await nft.tokenCount();

        await (await nft.setApprovalForAll(marketplace.address, true)).wait();
        const listingPrice = ethers.utils.parseEther(
          formParams.price.toString()
        );

        console.log(id, "id");
        console.log(nft.address, listingPrice, "meta");

        await (
          await marketplace.makeItem(nft.address, id, listingPrice)
        ).wait();
        alert("listed your NFT !!");

        setFormParams({ name: "", description: "", price: "" });
        // window.location.replace("/");
      } catch (e) {
        alert("upload error", e);
        console.log(e);
      }
    }
  }

  return (
    <div className="flex justify-center content-center max-w-[1200px] mx-auto ">
      <div className="border- border-gray-40 drop-shadow-lg  bg-slate-100 rounded-lg p-4 mt-10 w-[60%] items-center flex flex-col justify-center">
        <div className="flex flex-col mt-5 ">
          <div>Enter the Name of the NFT</div>
          <input
            type="text"
            required
            className="mt-2 rounded-lg drop-shadow-sm p-2"
            onChange={(e) =>
              setFormParams({ ...formParams, name: e.target.value })
            }
            value={formParams.name}
          />

          <div className="mt-8">Enter the Description </div>
          <textarea
            name="Description"
            id=""
            cols="30"
            rows="5"
            className="mt-2 rounded-lg drop-shadow-sm"
            onChange={(e) =>
              setFormParams({ ...formParams, description: e.target.value })
            }
            value={formParams.description}
          ></textarea>

          <div className="mt-8">Price of the NFT</div>
          {/* <input
            type="number"
            required
            className="mt-2 rounded-lg drop-shadow-sm text-sm p-2"
            // onChange={(e) =>
            //   setFormParams({ ...formParams, price: e.target.value })
            // }
            value={formParams.price}
            placeholder="price in Matic"
          /> */}
          <p className="mt-2 rounded-lg drop-shadow-sm text-md p-1">
            0.01 MATIC
          </p>
        </div>

        <div className="flex flex-col mt-4 gap-2 ml-16">
          <div>Upload Image</div>
          <input type="file" required name="file" onChange={uploadToIpfs} />
        </div>

        <div className="mt-8">
          <button
            className=" p-3 rounded-full mb-5 bg-blue-600 text-white drop-shadow-lg"
            onClick={createNFT}
          >
            Create and List NFT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create_NFT;
