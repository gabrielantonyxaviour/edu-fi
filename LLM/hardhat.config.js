require("@nomicfoundation/hardhat-toolbox");
require("hardhat-dependency-compiler");
require("hardhat-contract-sizer");
require("./tasks");
const { networks } = require("./networks");

const REPORT_GAS =
  process.env.REPORT_GAS?.toLowerCase() === "true" ? true : false;

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};
module.exports = {
  solidity: "0.7.6",
  networks: {
    ...networks,
  },
  etherscan: {
    apiKey: {
      sepolia: networks.sepolia.verifyApiKey,
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      fhenixTestnet: "UNSET",
      chilizSpicy: "routescan",
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: networks.arbitrumSepolia.chainId,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api/",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
      {
        network: "fhenixTestnet",
        chainId: networks.fhenixTestnet.chainId,
        urls: {
          apiURL: "https://api.helium.fhenix.zone",
          browserURL: "https://explorer.helium.fhenix.zone",
        },
      },
      {
        network: "chilizSpicy",
        chainId: networks.chilizSpicy.chainId,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan",
          browserURL: "https://testnet.chiliscan.com",
        },
      },
    ],
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
  },
  mocha: {
    timeout: 200000,
  },
};
