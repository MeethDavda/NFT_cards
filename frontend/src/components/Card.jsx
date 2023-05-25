import { ethers } from "ethers";

function Card({ item, buyMarketItem, myNft }) {
  return (
    <div className="flex flex-col bg-slate-100 p-4 rounded-xl drop-shadow-lg w-[55%]">
      <img
        src={item.image}
        alt="nft image"
        className="object-contain h-[7em] mb-5"
      />
      <div className="flex flex-col">
        <div>
          <p className="font-light">Name:</p>
          <div className="font-medium">{item.name}</div>
        </div>
        <div className="mt-5">
          <p className="font-light">Description:</p>
          <div className="font-medium">{item.description}</div>
        </div>
      </div>
      {myNft ? null : (
        <div
          className="bg-blue-500 p-3 mt-8 rounded-xl flex justify-center text-white font-medium cursor-pointer"
          onClick={() => buyMarketItem(item)}
        >
          <button>
            Buy for {ethers.utils.formatEther(item.totalPrice)}ETH
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
