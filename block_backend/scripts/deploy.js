const hre = require("hardhat");

async function main() {
  const [developer] = await hre.ethers.getSigners();
  const NFT = await hre.ethers.getContractFactory("NFT");
  const contract = await NFT.deploy();
  await contract.deployed();

  console.log("Contract address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
