"use client";
import { useEnvironmentContext } from "@/components/sections/context";

import { config } from "@/lib/config";
import { supportedchains } from "@/lib/constants";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { useAccount, useBalance, useReadContract, useSwitchChain } from "wagmi";

export default function StakePage() {
  const { switchChain } = useSwitchChain();
  const { action, actionParams } = useEnvironmentContext();
  const { data: sharePrice } = useReadContract({
    config,
    chainId: chainId as any,
    functionName: "currentSharePrice",
    address: supportedchains[chainId as any].stake,
    args: [],
    abi: [
      {
        inputs: [],
        name: "currentSharePrice",
        outputs: [
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  });

  useEffect(() => {
    setStoneAmount(
      roundUpToFiveDecimals(
        (
          parseFloat(stakeAmount) /
          parseFloat(formatEther(sharePrice || BigInt("0")))
        ).toString()
      )
    );
  }, [sharePrice, stakeAmount]);

  useEffect(() => {
    if (chainId == 56 || chainId == 97) switchChain({ chainId: 11155111 });
  }, [chainId]);

  useEffect(() => {
    if (action == "stake") {
      const p = actionParams.split("_");
      setStakeAmount(p[1]);
      const c = parseInt(p[0]);
      if (c != chainId) {
        switchChain({ chainId: c });
      }
    }
  }, [actionParams]);
  return <div className="flex justify-center items-center h-full"></div>;
}
