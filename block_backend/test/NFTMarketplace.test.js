const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const froWei = (num) => ethers.utils.formatEther(num)
describe("NFTMarketplace", async function(){
    let deployer, addr1, addr2, nft, marketplace;
    let feePercent = 1;
    let URI = "Sample URI";
    beforeEach(async function(){
        const NFT = await hre.ethers.getContractFactory("NFT");
        const Marketplace = await ethers.getContractFactory("Marketplace");

        [deployer, addr1, addr2] = await ethers.getSigners();

        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent)
    });

    describe("Deployment", function(){
        it("Should track the name and symbol of the nft collection", async function(){
            expect(await nft.name()).to.equal("DApp NFT")
            expect(await nft.symbol()).to.equal("DAPP")
        })

        it("Should track the feeAccount and the feePercent of the marketplace", async function(){
            expect(await marketplace.feeAccount()).to.equal(deployer.address)
            expect(await marketplace.feePercent()).to.equal(feePercent)
        })
    })

    describe("Minting NFTs", function(){
        it("Should track each minted NFT", async function(){
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);
        })
    })

    describe("Making marketplace items", function(){
        this.beforeEach(async function(){
            await nft.connect(addr1).uint(URI)
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
        })

        it("Should track newly created item, tranfer NFT from the seller to marketplace and emit offered event", async function(){
            await expect(marketplace.connect(addre1).makeItem(nft.address, 1, toWei(1))).to.emit(marketplace, "Offered").withArgs(
                1,
                nft.address,
                1,
                toWei(1),
                addr1.address
            )

            expect(await nft.ownerOf(1)).to.equal(marketplace.address);

            expect(await marketplace.itemCount()).to.equal(1);

            const item = await marketplace.items(1)
            expect(item.itemId).to.equal(1)
            expect(item.nft).to.equal(nft.address)
            expect(item.tokenId).to.equal(1)
            expect(item.price).to.equal(toWei(1))
            expect(item.sold).to.equal(false)
        });

        it("Should fail if the price is set to zero", async function(){
            await expect(
                marketplace.connect(addr1).makeItems(nft.address, 1, 0)
            ).to.be.revertedWith("Price must be greater than zero");
        });
    });
})