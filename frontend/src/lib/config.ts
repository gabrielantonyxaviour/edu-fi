import { bsc, bscTestnet, mainnet, sepolia } from "viem/chains";
import { http, createConfig } from "wagmi";
export const config = createConfig({
  chains: [bscTestnet, bsc, mainnet, sepolia],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
