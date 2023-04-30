require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./block_backend/artifacts",
    sources: "./block_backend/contracts",
    cache: "./block_backend/cache",
    tests: "./block_backend/test",
  },
};
