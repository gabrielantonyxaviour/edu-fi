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
import { arbitrumSepolia } from "viem/chains";
export default function From({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  fromBalance,
  isTestnet,
  toToken,
}: {
  toToken: string;
  fromAmount: string;
  fromBalance: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  isTestnet: boolean;
}) {
  const { chainId } = useAccount();
  const [chevron, setChevron] = useState(true);
  return (
    <Card className="w-full pt-2  border-none ">
      <CardTitle>
        <p className="text-xs text-muted-foreground font-semibold px-2">
          You pay
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setChevron(!chevron);
          }}
          className="border-none"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setChevron(!chevron);
              }}
              className="data-[state=open]:bg-transparent focus:bg-transparent"
            >
              <div className=" flex space-x-2 items-center ">
                <Image
                  src={supportedcoins[fromToken].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{`${isTestnet ? "t" : ""}${
                  supportedcoins[fromToken].symbol
                }`}</p>
                {!chevron ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              {/* <MenubarItem
                disabled={toToken == "eth" || toToken == "edu"}
                onClick={() => {
                  setFromToken(chainId == arbitrumSepolia.id ? "eth" : "edu");
                  setChevron(true);
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
                    disabled={coinId == toToken}
                    onClick={() => {
                      setFromToken(coinId);
                      setChevron(true);
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
                      <p>{(isTestnet ? "t" : "") + coin.symbol}</p>
                    </div>
                  </MenubarItem>
                ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Input
          className="font-semibold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 bg-transparent border-none w-[50%] text-right "
          value={fromAmount}
          onChange={(e) => {
            const decimalRegex = /^\d+(\.\d*)?$/;
            if (decimalRegex.test(e.target.value) || e.target.value == "")
              setFromAmount(e.target.value);
          }}
        />
      </CardContent>

      <CardFooter className="pb-4 px-2 flex justify-between text-muted-foreground">
        <p className="text-xs ">{supportedcoins[fromToken].name}</p>

        <p className="text-end text-xs font-medium">Balance: {fromBalance} </p>
      </CardFooter>
    </Card>
  );
}
