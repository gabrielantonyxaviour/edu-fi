require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}

const networks = {
  chilizSpicy: {
    url: "https://spicy-rpc.chiliz.com",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "UNSET",
    chainId: 88882,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "CHZ",
    mailbox: "0x1EBa83975Bb26c3F13fb4ACEd748550A29F0BB1B",
  },
  fhenixTestnet: {
    url: "https://api.helium.fhenix.zone",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "UNSET",
    chainId: 8008135,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "tFHE",
    mailbox: "0x8723e1E9955BC0461a12ADD57DEa5Ab84B3aFdAc",
  },
  arbitrumSepolia: {
    url:
      "https://arb-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8",
  },
  sepolia: {
    url:
      "https://eth-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "GS83CI8QDKIZ62QI4YD56C6PP6N2T9AYNF",
    chainId: 11155111,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8",
  },
  bsc: {
    url: "https://binance.llamarpc.com",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "UNSET",
    chainId: 56,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "BNB",
  },
  mainnet: {
    url: "https://eth.llamarpc.com",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "UNSET",
    chainId: 1,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
  },
};

module.exports = {
  networks,
};
