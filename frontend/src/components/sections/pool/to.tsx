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
    <Card className="w-full pt-4 border-muted-background bg-zinc-950">
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
          className="border-none"
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
              <MenubarItem
                disabled={fromToken == "nativeEth" || fromToken == "nativeBnb"}
                onClick={() => {
                  setToToken(
                    supportedchains[(chainId || 11155111).toString()].symbol ==
                      "ETH"
                      ? "nativeEth"
                      : "nativeBnb"
                  );
                  setToChevron(true);
                }}
              >
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
                    {(isTestnet ? "t" : "") +
                      supportedchains[(chainId || 11155111).toString()].symbol}
                  </p>
                </div>
              </MenubarItem>
              {(chainId == 1 || chainId == 11155111) && (
                <MenubarItem
                  disabled={fromToken == "wrappedEth"}
                  onClick={() => {
                    setToToken("wrappedEth");
                    setToChevron(true);
                  }}
                >
                  <div className="flex space-x-2">
                    <Image
                      src={supportedcoins["wrappedEth"].image}
                      width={20}
                      height={20}
                      alt=""
                      className="rounded-full"
                    />
                    <p>
                      {(isTestnet ? "t" : "") +
                        supportedcoins["wrappedEth"].symbol}
                    </p>
                  </div>
                </MenubarItem>
              )}
              {Object.values(supportedcoins)
                .slice(10)
                .map((coin) => (
                  <MenubarItem
                    disabled={coin.symbol.toLocaleLowerCase() == fromToken}
                    onClick={() => {
                      setToToken(coin.symbol.toLowerCase());
                      setToChevron(true);
                    }}
                  >
                    <div className="flex space-x-2">
                      <Image
                        src={`/coins/${coin.symbol.toLowerCase()}.png`}
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p>{(isTestnet ? "t" : "") + coin.symbol}</p>
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
            className="font-semibold border-none w-[50%] text-right hover:border-none"
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
