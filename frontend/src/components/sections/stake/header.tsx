import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import { supportedchains } from "@/lib/constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export default function SwitchChainHeader() {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [chainChevron, setChainChevron] = useState(false);
  return (
    <CardTitle>
      <div className="flex justify-between items-center px-10 py-1">
        <p
          className={`hover:bg-transparent text-primary  text-base font-medium text-center
                `}
        >
          Stake
        </p>
        <Menubar onClick={() => {}} className="border-none text-sm">
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setChainChevron(!chainChevron);
              }}
            >
              <div className="flex space-x-2 items-center ">
                <Image
                  src={supportedchains[(chainId || 11155111).toString()].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{supportedchains[(chainId || 11155111).toString()].name}</p>
                {!chainChevron ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              {Object.values(supportedchains)
                .sort((a, b) => a.id - b.id)
                .map((coin) => (
                  <MenubarItem
                    disabled={coin.stakeDisabled}
                    className=" cursor-pointer w-full"
                    onClick={async () => {
                      await switchChainAsync({
                        chainId: coin.chainId,
                      });
                      setChainChevron(true);
                    }}
                  >
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
                  </MenubarItem>
                ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </CardTitle>
  );
}
