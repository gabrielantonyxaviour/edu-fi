require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY || "";

// Polygon
const EDUCHAIN_RPC_URL =
  process.env.EDUCHAIN_RPC_URL ||
  "	https://rpc.open-campus-codex.gelato.digital";

// Arbitrum
const ARBITRUM_SEPOLIA_RPC_URL = "https://sepolia-rollup.arbitrum.io/rpc";
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";

const networks = {
  hardhat: {
    chainId: 31337,
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    chainId: 31337,
  },
  arbitrumSepolia: {
    gasPrice: undefined,
    nonce: undefined,
    accounts: [PRIVATE_KEY],
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    chainId: 421614,
    url: ARBITRUM_SEPOLIA_RPC_URL,
    verifyApiKey: ARBISCAN_API_KEY,
    nativeCurrencySymbol: "ETH",
  },
  educhainTestnet: {
    gasPrice: undefined,
    nonce: undefined,
    accounts: [PRIVATE_KEY],
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    chainId: 656476,
    url: EDUCHAIN_RPC_URL,
    verifyApiKey: "",
    nativeCurrencySymbol: "ETH",
  },
};

module.exports = {
  networks,
};
