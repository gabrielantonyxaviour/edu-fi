import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { bscTestnet } from "viem/chains";
import { Button } from "./button";
import { Icons } from "./icons";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import Image from "next/image";
import { supportedchains } from "@/lib/constants";
import { ArrowLeftCircleIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ConnectButton() {
  const { address, status, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const [chainChevron, setChainChevron] = useState(false);
  const pathname = usePathname();

  return status == "connected" ? (
    <>
      <Menubar
        onClick={() => {
          setChainChevron(!chainChevron);
        }}
        className="border-none text-sm"
      >
        <MenubarMenu>
          <MenubarTrigger
            className="w-full"
            onClick={() => {
              setChainChevron(!chainChevron);
            }}
          >
            <div className="flex space-x-2 items-center w-full justify-between">
              <div className="flex space-x-2">
                <Image
                  src={supportedchains[(chainId || 11155111).toString()].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{supportedchains[(chainId || 11155111).toString()].name}</p>
              </div>

              {!chainChevron ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </MenubarTrigger>
          <MenubarContent className="w-full">
            {Object.values(supportedchains)
              .sort((a, b) => a.id - b.id)
              .map((coin) => (
                <MenubarItem
                  key={coin.id}
                  disabled={
                    (pathname == "/pool" && coin.chainId == 97) ||
                    (pathname == "/stake" &&
                      (coin.chainId == 56 || coin.chainId == 97)) ||
                    (pathname == "/positions" && coin.chainId != 56)
                  }
                  className=" cursor-pointer w-full"
                  onClick={async () => {
                    try {
                      await switchChainAsync({
                        chainId: coin.chainId,
                      });
                      setChainChevron(true);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <div className="flex space-x-2 items-center w-full justify-between">
                    <div className="flex space-x-2">
                      <Image
                        src={coin.image}
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p>{coin.name}</p>
                    </div>
                  </div>
                </MenubarItem>
              ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button
        variant="outline"
        className="my-auto "
        onClick={() => {
          disconnect();
        }}
      >
        <Icons.binance className="h-6 w-6 fill-current mr-2" />
        {address?.slice(0, 6) + "..." + address?.slice(-6)}
      </Button>
    </>
  ) : (
    <Button
      variant="outline"
      className="my-auto"
      onClick={() => {
        console.log("connect");
        connect({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }}
    >
      Connect Wallet
    </Button>
  );
}
