import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState } from "react";

function Create_NFT() {
  const [image, setImage] = useState("");
  const [name, setName] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function uploadToIpfs(event) {} //Infura made their api paid - new alternative Pinata

  async function createNFT() {}

  return (
    <div className="flex justify-center content-center max-w-[1200px] mx-auto ">
      <div className="border-2 border-gray-400 bg-slate-100 rounded-md p-4 mt-10 w-[60%] items-center flex flex-col justify-center">
        <input type="file" required name="file" onChange={uploadToIpfs} />

        <div className="flex flex-col mt-5 ">
          <div>Enter the Name of the NFT</div>
          <input
            type="text"
            required
            className="mt-2 border-2 border-gray-400 p-2"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="mt-8">Enter the Description </div>
          <textarea
            name="Description"
            id=""
            cols="30"
            rows="5"
            className="mt-2 border-2 border-gray-400"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="mt-8">Enter the Price of the NFT</div>
          <input
            type="number"
            required
            className="mt-2 border-2 border-gray-400 text-sm p-2"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price in ETH"
          />
        </div>
        <div className="mt-8">
          <button
            className=" p-3 rounded-full border-2 border-slate-600"
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
