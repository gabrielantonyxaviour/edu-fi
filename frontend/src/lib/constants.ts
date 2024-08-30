import { arbitrumSepolia } from "viem/chains";
import { educhainTestnet } from "./config";

export const COINMARKETCAP_IDS: Record<string, number> = {
  link: 1975,
  usdc: 3408,
  usdt: 825,
  eth: 1027,
  edu: 24613,
  dai: 4943,
  weth: 2396,
};

export const supportedcoins: Record<string, any> = {
  edu: {
    name: "Test EduChain",
    symbol: "tEDU",
    image: "/coins/edu.png",
  },
  eth: {
    name: "Test Arbitrum Etherem",
    symbol: "tETH",
    image: "/coins/arbitrum.png",
  },
  weth: {
    name: "Test Wrapped Ethereum",
    symbol: "tWETH",
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
  dai: {
    name: "Test Dai",
    symbol: "tDAI",
    image: "/coins/dai.png",
  },
  eduweth: {
    name: "Test Wrapped Ethereum",
    symbol: "tWETH",
    image: "/coins/weth.png",
  },
  edulink: {
    name: "Test Chain Link ",
    symbol: "tLINK",
    image: "/coins/link.png",
  },
  eduusdc: {
    name: "Test USD Stablecoin",
    symbol: "tUSDC",
    image: "/coins/usdc.png",
  },
  eduusdt: {
    name: "Test Tether USD",
    symbol: "tUSDT",
    image: "/coins/usdt.png",
  },
  edudai: {
    name: "Test Dai",
    symbol: "tDAI",
    image: "/coins/dai.png",
  },
};

export const supportedchains: Record<string, any> = {
  [educhainTestnet.id]: {
    id: 1,
    name: "Educhain Testnet",
    chainId: educhainTestnet.id,
    symbol: "EDU",
    image: "/coins/edu.png",
    poolFactory: "0xBbF4E51Cfa0f681a4eBBC5E800b4f53507B00A5B",
    explorer: "https://opencampus-codex.blockscout.com/",
    tokens: {
      usdt: "0x20166f04ed7D1Bf4938bACa0f9456b7e676eD2A2",
      link: "0xeCC1d950bDE3fE9b632A159E24E60a29601aC5fC",
      usdc: "0x0C29b8C5121a4a72E9D623eFe418875fc7E3Dd15",
      dai: "0x17517F552d14E3ae1b2a8005f594D7916CE6466d",
      weth: "0xcfA34a6eAA2Db2E89f77E754B3Aa62BD82042556",
    },
    pools: {
      usdcweth: "0x83bbf0853aad133a6fe145c163e0d02e65dee461",
    },
  },
  [arbitrumSepolia.id]: {
    id: 1,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io/",
    poolFactory: "0x7334481e7551dE063316f7d3AcE2629761575A51",
    tokens: {
      usdt: "0xc7f60886A8d39446F0689A546CC0eaAF40a32877",
      link: "0x4b8b404503B4ff02Ad56F1cA03385E09e5081Add",
      usdc: "0x2f80513FD5119CD9DC340cd0666Ee84d00A3e799",
      dai: "0x202d9A90bC43e9904668F141f494CA6770dDD9A1",
      weth: "0xDC53A67F182f0495AfCfF3Dc592A7CC02f2Ffe92",
    },
    pools: {
      usdcweth: "0xB7CF382335e0Ca1E227c5eBDAd068A9eE330CfD0",
    },
  },
};

export const poolAbi = [
  {
    constant: false,
    inputs: [
      {
        name: "recipient",
        type: "address",
      },
      {
        name: "tickLower",
        type: "int24",
      },
      {
        name: "tickUpper",
        type: "int24",
      },
      {
        name: "amount0",
        type: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "recipient",
        type: "address",
      },
      {
        name: "zeroForOne",
        type: "bool",
      },
      {
        name: "amount0",
        type: "int256",
      },
      {
        name: "amount1",
        type: "int256",
      },
    ],
    name: "swap",
    outputs: [
      {
        name: "",
        type: "int256",
      },
      {
        name: "",
        type: "int256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
