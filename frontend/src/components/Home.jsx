import { useEffect, useState } from "react";
import Card from "./Card";

function Home({ marketplace, nft }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMarketplaceItems() {
    // console.log("loading");

    let items = [];
    const itemCount = await marketplace?.itemCount();
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        const uri = await nft.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metaData = await response.json();
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metaData.name,
          description: metaData.description,
          image: metaData.image,
        });
      }
    }
    setLoading(false);
    setItems(items);
  }

  async function buyMarketItem(item) {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  }

  //   console.log(items, "items");
  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10 text-2xl mx-auto">
          <p className="bg-red-300 p-4 rounded-xl ">
            Loading ...
            <p className="text-sm">It may take a few seconds</p>
          </p>
        </div>
      ) : (
        <div className="flex justify-center w-[90%] mx-auto">
          {items.length > 0 ? (
            <div className="flex flex-row mt-10 flex-wrap  justify-around">
              {items.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="text-black flex flex-row flex-wrap justify-around w-[30em] mb-10"
                  >
                    <Card item={item} buyMarketItem={buyMarketItem} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-10">No NFTs Listed</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
