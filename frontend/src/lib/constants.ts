import { arbitrumSepolia } from "viem/chains";

export const supportedcoins: Record<string, any> = {
  edu: {
    name: "EduChain",
    symbol: "EDU",
    image: "/coins/edu.png",
  },
  weth: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    image: "/coins/weth.png",
  },
  link: {
    name: "Test Chain Link ",
    symbol: "tLINK",
    image: "/coins/link.png",
  },
  usdc: {
    name: "Test USD Stablecoin",
    symbol: "tUSDC",
    image: "/coins/usdc.png",
  },
  usdt: {
    name: "Test Tether USD",
    symbol: "tUSDT",
    image: "/coins/usdt.png",
  },
};

export const supportedchains: Record<string, any> = {
  656476: {
    id: 1,
    name: "Educhain Testnet",
    chainId: 656476,
    symbol: "EDU",
    image: "/coins/edu.png",
    explorer: "https://opencampus-codex.blockscout.com/",
    tokens: {
      weth: "",
      usdc: "",
      usdt: "",
      link: "",
    },
  },
  [arbitrumSepolia.id]: {
    id: 1,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io",
    tokens: {
      weth: "",
      usdc: "",
      usdt: "",
      link: "",
    },
  },
};
