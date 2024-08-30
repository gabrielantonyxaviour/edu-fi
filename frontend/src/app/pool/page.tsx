"use client";
import Order from "@/components/sections/pool/order";
import Swap from "@/components/sections/pool/swap";
import Transaction from "@/components/sections/pool/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import ConnectButton from "@/components/ui/connect-button";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import { supportedchains } from "@/lib/constants";

import { useEnvironmentContext } from "@/components/sections/context";

export default function PoolPage() {
  const { action, actionParams } = useEnvironmentContext();
  const { balanceObject } = useEnvironmentContext();

  if (chainId == 97)
    return (
      <div className="flex flex-col space-y-4 justify-center items-center my-auto">
        <p className="text-lg font-semibold">
          Please switch your chain to <span className="text-primary">Swap</span>
        </p>
        <div className="flex flex-col items-center">
          <ConnectButton />
        </div>
      </div>
    );
  return <div className="flex justify-center items-center h-full"></div>;
}
