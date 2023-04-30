const hre = require("hardhat");

async function main() {
  const [developer] = await hre.ethers.getSigners();
  const NFT = await hre.ethers.getContractFactory("NFT");
  const contract = await NFT.deploy();
  await contract.deployed();

  console.log("Contract address:", contract.address);
  //contract address - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
  saveFrontendFiles(contract, "NFT");
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
