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
  namedAccounts: {
    deployer: {
      default: 0,
    },
    assistant: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      educhainTestnet: networks.educhainTestnet.verifyApiKey,
    },
    customChains: [
      {
        network: "educhainTestnet",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api/",
          browserURL: "https://opencampus-codex.blockscout.com/",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: networks.arbitrumSepolia.chainId,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api/",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
};
