const { networks } = require("./networks");

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-dependency-compiler");
require("hardhat-contract-sizer");
require("./tasks");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    ...networks,
  },
  // hardhat-deploy named account system
  namedAccounts: {
    deployer: {
      default: 0, // Deployer will be the first private key above
    },
    assistant: {
      default: 1, // Assistant will be the second private key above
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      educhainTestnet: "TEST",
    },
    customChains: [
      {
        network: "educhainTestnet",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api/v2/",
          browserURL: "https://opencampus-codex.blockscout.com/",
        },
      },
    ],
  },
};
