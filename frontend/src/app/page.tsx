"use client";

import { useAccount, useBalance } from "wagmi";
import DefaultLanding from "@/components/sections/default-landing";
import { TokenBalance } from "@/components/ui/token-balance";
import TokenBalanceCard from "@/components/sections/token-balance-card";
import Image from "next/image";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { useEffect, useState } from "react";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { config } from "@/lib/config";
import Spinner from "@/components/ui/loading";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { useEnvironmentContext } from "@/components/sections/context";
import "@/styles/spinner.css";
export default function Page() {
  const { status, address } = useAccount();
  const {
    totalBalanceMainnet,
    setTotalBalanceMainnet,
    totalBalanceTestnet,
    setTotalBalanceTestnet,
    balanceObject,
    setBalanceObject,
    balanceObjectInUSD,
    setBalanceObjectInUSD,
  } = useEnvironmentContext();

  if (status == "disconnected") return <DefaultLanding />;
  if (totalBalanceMainnet == null || totalBalanceTestnet == null)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex space-x-4 items-center">
          <div className="spinner"></div>
          <p className="font-semibold text-md">
            {balanceObject != null ? "Finishing up" : "Fetching Balances"}
          </p>
        </div>
      </div>
    );
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center py-6">
        <div className="flex">
          <div className="flex flex-col items-center">
            <Image
              src={"/avatar.jpg"}
              height={50}
              width={60}
              alt="Avatar"
              className="rounded-full"
            />
            <p className="text-3xl mt-4 mb-2 font-bold">Your Portfolio</p>
            <div className="flex space-x-8 text-center">
              <div>
                <p className="text-sm text-muted-foreground ">Mainnet Worth</p>
                <p className="text-md font-semibold">
                  <span className="text-muted-foreground mx-1">$</span>
                  {roundUpToFiveDecimals(totalBalanceMainnet.toString())}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground ">Testnet Worth</p>
                <p className="text-md font-semibold">
                  <span className="text-muted-foreground mx-1">$</span>
                  {roundUpToFiveDecimals(totalBalanceTestnet.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <TokenBalanceCard
          balances={{
            eth: roundUpToFiveDecimals(balanceObject[1].native),
            bnb: roundUpToFiveDecimals(balanceObject[56].native),
            usdc: roundUpToFiveDecimals(
              balanceObject[1].usdc + balanceObject[56].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObject[1].usdt + balanceObject[56].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObject[1].link + balanceObject[56].link
            ),
            teth: roundUpToFiveDecimals(balanceObject[11155111].native),
            tbnb: roundUpToFiveDecimals(balanceObject[97].native),
            tusdc: roundUpToFiveDecimals(
              balanceObject[11155111].usdc + balanceObject[97].usdc
            ),
            tusdt: roundUpToFiveDecimals(
              balanceObject[11155111].usdt + balanceObject[97].usdt
            ),
            tlink: roundUpToFiveDecimals(
              balanceObject[11155111].link + balanceObject[97].link
            ),
          }}
          usdBalances={{
            eth: roundUpToFiveDecimals(balanceObjectInUSD[1].native),
            bnb: roundUpToFiveDecimals(balanceObjectInUSD[56].native),
            usdc: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdc + balanceObjectInUSD[56].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdt + balanceObjectInUSD[56].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObjectInUSD[1].link + balanceObjectInUSD[56].link
            ),
            teth: roundUpToFiveDecimals(balanceObjectInUSD[11155111].native),
            tbnb: roundUpToFiveDecimals(balanceObjectInUSD[97].native),
            tusdc: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdc + balanceObjectInUSD[97].usdc
            ),
            tusdt: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdt + balanceObjectInUSD[97].usdt
            ),
            tlink: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].link + balanceObjectInUSD[97].link
            ),
          }}
        />
      </div>
    </div>
  );
}
