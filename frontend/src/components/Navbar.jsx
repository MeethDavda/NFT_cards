import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ web3Handler, account }) {
  const navigate = useNavigate();

  return (
    <div className="top-0 bg-slate-40 mx-auto max-w-[1400px]  p-3 mt-4 rounded-lg w-full bg-gray-100 drop-shadow-lg">
      <div className="flex flex-row justify-between ">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer my-auto text-2xl ml-[2em]"
        >
          Company NFT
        </div>
        <div className="flex flex-row mx-2">
          <a
            href="https://64832590fc24c4080450ee64--steady-buttercream-5a269c.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer my-auto mx-5"
          >
            Company Dropbox
          </a>
          <div
            onClick={() => navigate("/create")}
            className="cursor-pointer my-auto mx-5"
          >
            Create
          </div>
          <div
            onClick={() => navigate("/mynft")}
            className="cursor-pointer my-auto mx-5"
          >
            My NFTs
          </div>
          {account ? (
            <button
              type="submit"
              className=" bg-blue-600 text-white drop-shadow-lg h-12 w-36 rounded-full  mr-5"
              onClick={web3Handler}
            >
              {account.slice(0, 5) + " ... " + account.slice(38, 42)}
            </button>
          ) : (
            <button
              type="submit"
              className=" bg-blue-600 text-white drop-shadow-lg h-12 w-36 rounded-full  mr-5 "
              onClick={web3Handler}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
