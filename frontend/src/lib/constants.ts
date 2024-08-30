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
    poolFactory: "0x16697a88f99Bf9F06938e25D3343fF2144B8c3c6",
    explorer: "https://opencampus-codex.blockscout.com/",
    tokens: {
      usdt: "0x70e6A6B036cf5b8759E8E7105168568086d05430",
      link: "0x05b9e2568b6E992b271eAD594584F666eD09F254",
      usdc: "0x9Fa2f0872498f56Fec437d92D66842f162c6B922",
      dai: "0xAE82F939962BE8119f29E3a657fF6A07745fd735",
      weth: "0x35913884404941d616Ba76a90702572236DaF317",
    },
  },
  [arbitrumSepolia.id]: {
    id: 1,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io",
    poolFactory: "0x8DecD86959b87c64Be4978029a27D19c3e5d49DE",
    tokens: {
      usdt: "0xE53d7A2BA5774d41Fa47c10aa500716612C0075B",
      link: "0xD2BaD6B9846E68259daE49CdbdB92019fdD79150",
      usdc: "0x5030Eed1EC6f1205CD9317Ac2a229A2cEecE24ed",
      dai: "0x9050d7A160423d50F5B7C9eD3A0e44866Da7836b",
      weth: "0x5F6906e52918cac7c2f428441b8B92C65faAd534",
    },
  },
};
