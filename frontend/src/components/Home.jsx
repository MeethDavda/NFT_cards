import { useEffect, useState } from "react";
import Card from "./Card";

function Home({ marketplace, nft }) {
  const [items, setItems] = useState([]);
  async function loadMarketplaceItems() {
    let items = [];
    const itemCount = await marketplace.itemCount();
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
    setItems(items);
  }

  async function buyMarketItem(item) {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  }

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        {items.length > 0 ? (
          <div className="flex flex-row">
            {items.map((item, idx) => {
              <div key={idx} className="overflow-hidden">
                <Card item={item} buyMarketItem={buyMarketItem} />
              </div>;
            })}
          </div>
        ) : (
          <div>No Assets available</div>
        )}
      </div>
    </div>
  );
}

export default Home;
