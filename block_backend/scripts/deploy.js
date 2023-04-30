const hre = require("hardhat");

async function main() {
  const [developer] = await hre.ethers.getSigners();
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(1);

  console.log("Marketplace Contract address:", marketplace.address);

  console.log("NFT Contract address:", nft.address);
  //contract address - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

  //marketplace address (yashasvi): 0x0165878A594ca255338adfa4d48449f69242Eb8F
  //contract address (yashasvi):  0x5FC8d32690cc91D4c39d9d3abcBD16989F875707

  // Marketplace address (meeth): 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
  // NFT Contract address(meeth): 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

  saveFrontendFiles(contract, "NFT");
  saveFrontendFiles(marketplace, "Marketplace");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
