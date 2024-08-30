"use client";

import DefaultLanding from "@/components/sections/default-landing";
import PositionsCard from "@/components/sections/positions-card";
import RecentActionsCard from "@/components/sections/recent-actions-card";
import BoxCard from "@/components/ui/box-card";
import ConnectButton from "@/components/ui/connect-button";
import Spinner from "@/components/ui/loading";
import getPositionsPage from "@/lib/graph-queries/getPositionsPage";
import { Action, Position } from "@/lib/type";
import { getTotalClaimed, getTotalDeposited } from "@/lib/utils";
import {
  BaggageClaim,
  CircleDollarSign,
  LineChart,
  Notebook,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export default function Page() {
  const { address, status, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [actions, setActions] = useState<Action[] | null>(null);
  const [totalDeposited, setTotalDeposited] = useState<string | null>(null);
  const [totalClaimed, setTotalClaimed] = useState<string | null>(null);
  // Get Net Spent
  useEffect(() => {
    if (positions == null) return;
    console.log("positions");
    console.log(positions);
    (async function () {
      let total = 0;
      for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];
        const res = await getTotalDeposited({
          token0: pos.token0,
          token1: pos.token1,
          depositedToken0: pos.depositedToken0,
          depositedToken1: pos.depositedToken1,
        });
        console.log("res");
        console.log(res);
        total += parseFloat(res);
      }

      console.log("total");
      console.log(total);

      setTotalDeposited(total.toString());
    })();
  }, [positions]);

  // Get Claimed Amounts
  useEffect(() => {
    if (positions == null) return;
    (async function () {
      let total = 0;
      for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];
        const res = await getTotalClaimed({
          token0: pos.token0,
          token1: pos.token1,
          claimedToken0: pos.collectedFeesToken0,
          claimedToken1: pos.collectedFeesToken1,
        });
        console.log("res");
        console.log(res);
        total += parseFloat(res);
      }

      console.log("total");
      console.log(total);

      setTotalClaimed(total.toString());
    })();
  }, [positions]);

  // Get Positions and Actions

  useEffect(() => {
    (async function () {
      const { positions: pos, actions: act } = await getPositionsPage({
        address: address as `0x${string}`,
      });
      setPositions(pos);
      setActions(act);
    })();
  }, []);
  if (status == "disconnected") return <DefaultLanding />;

  useEffect(() => {
    if (chainId == 97 || chainId == 1 || chainId == 11155111) {
      try {
        switchChain({ chainId: 56 });
      } catch (e) {
        console.log(e);
      }
    }
  }, [chainId]);
  if (chainId != 56)
    return (
      <div className="flex flex-col space-y-4 justify-center items-center my-auto">
        <p className="text-lg font-semibold">
          Please switch your chain to view{" "}
          <span className="text-primary">Positions</span>
        </p>
        <div className="flex flex-col items-center">
          <ConnectButton />
        </div>
      </div>
    );

  if (
    totalDeposited == null ||
    totalClaimed == null ||
    positions == null ||
    actions == null
  )
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <BoxCard
          title="Positions"
          value={positions.length.toString()}
          icon={<Notebook className="h-6 w-6 text-yellow-500 " />}
        />
        <BoxCard
          title="Net Spent"
          value={totalDeposited}
          icon={<CircleDollarSign className="h-6 w-6 text-yellow-500 " />}
        />

        <BoxCard
          title="Claimed Fees"
          value={totalClaimed != "0" ? "+" + totalClaimed : totalClaimed}
          icon={<BaggageClaim className="h-6 w-6 text-yellow-500" />}
        />
      </div>
      <PositionsCard positions={positions} />
      <RecentActionsCard actions={actions} />
    </div>
  );
}
