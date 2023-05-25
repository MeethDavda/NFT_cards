import React, { useState, useEffect } from "react";
import Card from "./Card";

function MyNFT({ marketplace, nft, account }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplace.queryFilter(filter);
    // console.log(result);
    const purchases = await Promise.all(
      results.map(async (i) => {
        i = i.args;
        const uri = await nft.tokenURI(i.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        // console.log(metadata, "helo");
        const totalPrice = await marketplace.getTotalPrice(i.itemId);

        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10 text-2xl ">
          <p className="bg-red-300 p-4 rounded-xl ">Loading ...</p>
        </div>
      ) : (
        <div className="flex justify-center">
          {purchases.length > 0 ? (
            <div className="flex flex-row mt-10">
              {purchases.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="text-black flex flex-row flex-wrap justify-around w-[30em]"
                  >
                    <Card myNft={true} item={item} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No Assets available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyNFT;
