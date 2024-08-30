import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { arbitrumSepolia } from "viem/chains";
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
import { educhainTestnet } from "@/lib/config";

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
        className="border-none text-sm py-auto bg-secondary mx-2"
      >
        <MenubarMenu>
          <MenubarTrigger
            className="w-full"
            onClick={() => {
              setChainChevron(!chainChevron);
            }}
          >
            <div className="flex space-x-2 items-center w-full justify-between">
              {chainId != arbitrumSepolia.id &&
              chainId != educhainTestnet.id ? (
                <div className="flex space-x-2">
                  <p>❌</p>
                  <p>Wrong Network</p>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Image
                    src={
                      supportedchains[(chainId || 11155111).toString()].image
                    }
                    width={20}
                    height={20}
                    alt=""
                    className="rounded-full"
                  />
                  <p>
                    {supportedchains[(chainId || 11155111).toString()].name}
                  </p>
                </div>
              )}

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
              .map((chain) => (
                <MenubarItem
                  key={chain.id}
                  disabled={
                    (pathname == "/pool" && chain.chainId == 97) ||
                    (pathname == "/stake" &&
                      (chain.chainId == 56 || chain.chainId == 97)) ||
                    (pathname == "/positions" && chain.chainId != 56)
                  }
                  className=" cursor-pointer w-full"
                  onClick={async () => {
                    try {
                      await switchChainAsync({
                        chainId: chain.chainId,
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
                        src={chain.image}
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p>{chain.name}</p>
                    </div>
                  </div>
                </MenubarItem>
              ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Button
        className="my-auto flex space-x-2"
        onClick={() => {
          disconnect();
        }}
      >
        <Image
          src={`/avatar.jpeg`}
          width={25}
          height={25}
          alt="Avatar"
          className="rounded-full "
        />
        <p>{address?.slice(0, 6) + "..." + address?.slice(-6)}</p>
      </Button>
    </>
  ) : (
    <Button
      className="my-auto"
      onClick={() => {
        console.log("connect");
        connect({
          chainId: educhainTestnet.id,
          connector: injected(),
        });
      }}
    >
      Connect Wallet
    </Button>
  );
}
