import { defineChain } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { http, createConfig } from "wagmi";

export const educhainTestnet = defineChain({
  id: 656476,
  name: "Educhain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EDU",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: {
      name: "Open Campus Codex explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});
export const config = createConfig({
  chains: [educhainTestnet, arbitrumSepolia],
  transports: {
    [educhainTestnet.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
