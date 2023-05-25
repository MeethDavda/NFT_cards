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
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EinD_S2sid7QUKb5aDiDKsyl83lkoudo",
      accounts: [
        "11245e81272c2118e715e521c1a84e804a9ea82fe4dec34bde4684fefb173565",
      ],
    },
  },
};
