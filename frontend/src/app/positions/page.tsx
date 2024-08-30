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

  // Get Claimed Amounts

  // Get Positions and Actions

  return <div className="flex-1 flex flex-col space-y-4"></div>;
}
