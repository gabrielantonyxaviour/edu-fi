"use client";
import { useEnvironmentContext } from "@/components/sections/context";
import ApyTvl from "@/components/sections/stake/apy-tvl";
import SwitchChainHeader from "@/components/sections/stake/header";
import Receive from "@/components/sections/stake/receive";
import Stake from "@/components/sections/stake/stake";
import StakeTransaction from "@/components/sections/stake/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ConnectButton from "@/components/ui/connect-button";
import { config } from "@/lib/config";
import { supportedchains } from "@/lib/constants";
import { roundUpToFiveDecimals } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useReadContract, useSwitchChain } from "wagmi";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("0");
  const [stoneAmount, setStoneAmount] = useState("0");
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data } = useBalance({ address });
  const [open, setOpen] = useState(false);
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

  if (chainId == 56 || chainId == 97)
    return (
      <div className="flex flex-col space-y-4 justify-center items-center my-auto">
        <p className="text-lg font-semibold">
          Please switch your chain to{" "}
          <span className="text-primary">Stake</span>
        </p>
        <div className="flex flex-col items-center">
          <ConnectButton />
        </div>
      </div>
    );
  useEffect(() => {
    if (action == "stake") {
      const p = actionParams.split("_");
      setStakeAmount(p[1]);
      const c = parseInt(p[0]);
      if (c != chainId) {
        switchChain({ chainId: c });
      }
    }
  }, [action]);
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="border-none w-[500px] ">
        <SwitchChainHeader />
        <CardContent>
          <ApyTvl />
          <Stake
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            balance={data?.formatted || "0"}
          />

          <Receive
            stonePrice={formatEther(sharePrice || BigInt("0"))}
            stoneAmount={stoneAmount}
          />
          <div className="px-4">
            <Button
              className="w-full mt-3 font-bold text-sm"
              disabled={
                parseFloat(stakeAmount) == 0.0 ||
                parseFloat(stakeAmount) >= parseFloat(data?.formatted || "0")
              }
              onClick={() => {
                setOpen(true);
              }}
            >
              {parseFloat(stakeAmount) >= parseFloat(data?.formatted || "0")
                ? "Insufficient Balance"
                : parseFloat(stakeAmount) == 0.0
                ? "Enter Amount to Stake"
                : "Stake"}
            </Button>
          </div>
          <div className="flex justify-end pt-2 text-muted-foreground space-x-1 px-4">
            <p className="font-semibold text-xs">Powered By </p>
            <Image
              src="/coins/stakestone.jpg"
              width={18}
              height={20}
              alt=""
              className="rounded-full bg-white"
            />
            <p className="font-semibold text-xs">StakeStone </p>
          </div>
        </CardContent>
      </Card>
      <StakeTransaction
        stakeAmount={stakeAmount}
        stoneAmount={stoneAmount}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
