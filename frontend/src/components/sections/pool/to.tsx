import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useState } from "react";
import Spinner from "@/components/ui/loading";
import { arbitrumSepolia } from "viem/chains";
export default function To({
  fromToken,
  toAmount,
  toToken,
  setToToken,
  toLoading,
  isTestnet,
}: {
  fromToken: string;
  toAmount: string;
  toToken: string;
  setToToken: (toToken: string) => void;
  toLoading: boolean;
  isTestnet: boolean;
}) {
  const { chainId } = useAccount();
  const [toChevron, setToChevron] = useState(true);
  return (
    <Card className="w-full pt-4 border-none bg-secondary">
      <CardTitle className="">
        <p className="text-xs text-muted-foreground font-semibold px-2">
          You receive
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setToChevron(!toChevron);
          }}
          className="border-none bg-transparent"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setToChevron(!toChevron);
              }}
            >
              <div className="flex space-x-2 items-center ">
                <Image
                  src={supportedcoins[toToken].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{`${isTestnet ? "t" : ""}${
                  supportedcoins[toToken].symbol
                }`}</p>
                {!toChevron ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              {/* <MenubarItem
                disabled={fromToken == "eth" || fromToken == "edu"}
                onClick={() => {
                  setToToken(chainId == arbitrumSepolia.id ? "eth" : "edu");

                  setToChevron(true);
                }}
              >
                <div className="flex space-x-2">
                  <Image
                    src={
                      supportedcoins[
                        chainId == arbitrumSepolia.id ? "eth" : "edu"
                      ].image
                    }
                    width={20}
                    height={20}
                    alt=""
                    className="rounded-full"
                  />
                  <p>
                    {
                      supportedcoins[
                        chainId == arbitrumSepolia.id ? "eth" : "edu"
                      ].symbol
                    }
                  </p>
                </div>
              </MenubarItem> */}

              {Object.entries(supportedcoins)
                .slice(2, 7)
                .map(([coinId, coin]) => (
                  <MenubarItem
                    disabled={coinId == fromToken}
                    onClick={() => {
                      setToToken(coinId);
                      setToChevron(true);
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
                      <p>{coin.symbol}</p>
                    </div>
                  </MenubarItem>
                ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {toLoading ? (
          <div className="pr-4">
            <Spinner />
          </div>
        ) : (
          <Input
            className="font-semibold border-none w-[50%] text-right hover:border-none bg-transparent"
            disabled
            value={toAmount}
          />
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <p className="text-xs text-muted-foreground">
          {supportedcoins[toToken].name}
        </p>
      </CardFooter>
    </Card>
  );
}
