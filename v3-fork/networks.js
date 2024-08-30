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
    usdt: "0xE53d7A2BA5774d41Fa47c10aa500716612C0075B",
    link: "0xD2BaD6B9846E68259daE49CdbdB92019fdD79150",
    usdc: "0x5030Eed1EC6f1205CD9317Ac2a229A2cEecE24ed",
    dai: "0x9050d7A160423d50F5B7C9eD3A0e44866Da7836b",
    weth: "0x5F6906e52918cac7c2f428441b8B92C65faAd534",
    poolFactory: "0x16697a88f99Bf9F06938e25D3343fF2144B8c3c6",
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
    usdt: "0x70e6A6B036cf5b8759E8E7105168568086d05430",
    link: "0x05b9e2568b6E992b271eAD594584F666eD09F254",
    usdc: "0x9Fa2f0872498f56Fec437d92D66842f162c6B922",
    dai: "0xAE82F939962BE8119f29E3a657fF6A07745fd735",
    weth: "0x35913884404941d616Ba76a90702572236DaF317",
    poolFactory: "0x8DecD86959b87c64Be4978029a27D19c3e5d49DE",
  },
};

module.exports = {
  networks,
};
