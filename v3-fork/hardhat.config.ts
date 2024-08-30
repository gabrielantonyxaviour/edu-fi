import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@chainlink/env-enc").config();
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY || "";

// Polygon
const EDUCHAIN_RPC_URL =
  process.env.EDUCHAIN_RPC_URL ||
  "	https://rpc.open-campus-codex.gelato.digital";

// Arbitrum
const ARBITRUM_SEPOLIA_RPC_URL = "https://sepolia-rollup.arbitrum.io/rpc";
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: "none",
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    educhainTestnet: {
      chainId: 656476,
      url: EDUCHAIN_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
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
      arbitrumSepolia: ARBISCAN_API_KEY,
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

export default config;
