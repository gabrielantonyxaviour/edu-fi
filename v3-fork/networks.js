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
    confirmations: 1,
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    chainId: 31337,
    confirmations: 1,
    usdt: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    link: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    usdc: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    dai: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    weth: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    poolFactory: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
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
    usdt: "0xc7f60886A8d39446F0689A546CC0eaAF40a32877",
    link: "0x4b8b404503B4ff02Ad56F1cA03385E09e5081Add",
    usdc: "0x2f80513FD5119CD9DC340cd0666Ee84d00A3e799",
    dai: "0x202d9A90bC43e9904668F141f494CA6770dDD9A1",
    weth: "0xDC53A67F182f0495AfCfF3Dc592A7CC02f2Ffe92",
    poolFactory: "0x7334481e7551dE063316f7d3AcE2629761575A51",
    wethUsdcPool: "0xB7CF382335e0Ca1E227c5eBDAd068A9eE330CfD0",
  },
  educhainTestnet: {
    gasPrice: undefined,
    nonce: undefined,
    accounts: [PRIVATE_KEY],
    confirmations: 1,
    chainId: 656476,
    url: EDUCHAIN_RPC_URL,
    verifyApiKey: "XXX",
    nativeCurrencySymbol: "ETH",
    usdt: "0x20166f04ed7D1Bf4938bACa0f9456b7e676eD2A2",
    link: "0xeCC1d950bDE3fE9b632A159E24E60a29601aC5fC",
    usdc: "0x0C29b8C5121a4a72E9D623eFe418875fc7E3Dd15",
    dai: "0x17517F552d14E3ae1b2a8005f594D7916CE6466d",
    weth: "0xcfA34a6eAA2Db2E89f77E754B3Aa62BD82042556",
    poolFactory: "0xBbF4E51Cfa0f681a4eBBC5E800b4f53507B00A5B",
    wethUsdcPool: "0x83bbf0853aad133a6fe145c163e0d02e65dee461",
  },
};

module.exports = {
  networks,
};
