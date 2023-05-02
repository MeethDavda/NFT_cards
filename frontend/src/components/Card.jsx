import { ethers } from "ethers";

function Card({ item, buyMarketItem }) {
  return (
    <div className="flex flex-col">
      <img
        src={item.image}
        alt="nft image"
        className="object-contain h-[4em]"
      />
      <div className="flex flex-col">
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>
      <button onClick={buyMarketItem(item)}>
        Buy for {ethers.utils.formatEther(item.getotalPrice)}ETH
      </button>
    </div>
  );
}

export default Card;
