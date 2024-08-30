import Image from "next/image";

import ConnectButton from "@/components/ui/connect-button";
import { useAccount } from "wagmi";
import DefaultLanding from "../sections/default-landing";
import { useEffect, useState } from "react";
import { MainNav } from "./navbar";
import AIComponent from "./ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowLeftCircleIcon,
  ArrowRight,
  ArrowRightCircleIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEnvironmentContext } from "./context";
import axios from "axios";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { getBalance } from "@wagmi/core";
import { config } from "@/lib/config";
import { usePathname, useRouter } from "next/navigation";
interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: "",
  });
  const {
    balanceObject,
    setBalanceObject,
    setBalanceObjectInUSD,
    setTotalBalanceMainnet,
    setTotalBalanceTestnet,
    setActionParams,
    action,
    setAction,
    actionParams,
  } = useEnvironmentContext();
  const [balanceFetched, setBalanceFetched] = useState(false);
  const [access, setAccess] = useState(true); // TODO: Turn this off
  const [openAi, setOpenAi] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [convos, setConvos] = useState<Convo[]>([]);
  useEffect(() => {
    (async function () {
      console.log("BEFORE SNEDING TO AI");
      console.log(JSON.stringify(balanceObject));
      if (balanceFetched && balanceObject != null && convos.length == 0) {
        try {
          setThinking(true);
          const response = await axios.post("/api/classify", {
            message: JSON.stringify(balanceObject),
          });

          console.log(response.data);
          if (response.data.success == false) throw Error("Error in response");

          console.log(typeof response.data.response.response);
          setConvos([
            {
              id: "1",
              isAI: true,
              message: response.data.response.response,
            },
          ]);
          console.log({
            id: "1",
            isAI: true,
            message: response.data.response.response,
          });
        } catch (e) {
          console.log(e);
          setConvos([
            ...convos,
            {
              id: "1",
              isAI: true,
              message:
                "There is something wrong with the AI. Please refresh the page and try again. If this issue persists, contact @marshal_14627 in Discord.",
            },
          ]);
        }
        setThinking(false);
      }
    })();
  }, [balanceFetched]);

  useEffect(() => {
    if (address != null && balanceObject == null) {
      try {
        (async function () {
          const chains = Object.values(supportedchains);
          const tempBalanceObject: any = {};
          const tempEthBalance: any = {};
          const tempBnbBalance: any = {};
          const tempUsdcBalance: any = {};
          const tempUsdtBalance: any = {};
          const tempLinkBalance: any = {};
          for (let i = 0; i < chains.length; i++) {
            const chain = chains[i];
            tempBalanceObject[chain.chainId] = {};
            const { formatted: native } = await getBalance(config, {
              address: address,
              chainId: chain.chainId,
            });
            if (chain.chainId == 56 || chain.chainId == 97) {
              tempBnbBalance[chain.chainId] = native;
            } else {
              tempEthBalance[chain.chainId] = native;
            }
            tempBalanceObject[chain.chainId].native = native;

            const usdcAddress = supportedcoins.usdc.token[chain.chainId];
            if (usdcAddress.length > 0) {
              const { formatted: usdc } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdcAddress,
              });
              tempUsdcBalance[chain.chainId] = usdc;
              tempBalanceObject[chain.chainId].usdc = usdc;
            } else tempBalanceObject[chain.chainId].usdc = 0;
            const usdtAddress = supportedcoins.usdt.token[chain.chainId];
            if (usdtAddress.length > 0) {
              const { formatted: usdt } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdtAddress,
              });
              tempUsdtBalance[chain.chainId] = usdt;
              tempBalanceObject[chain.chainId].usdt = usdt;
            } else tempBalanceObject[chain.chainId].usdt = 0;

            const linkAddress = supportedcoins.link.token[chain.chainId];
            if (linkAddress.length > 0) {
              const { formatted: link } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: linkAddress,
              });
              tempLinkBalance[chain.chainId] = link;
              tempBalanceObject[chain.chainId].link = link;
            } else tempBalanceObject[chain.chainId].link = 0;
          }
          console.log("TEMP BALANCE OBJECT");
          console.log(tempBalanceObject);
          setBalanceObject(tempBalanceObject);
          setBalanceFetched(true);
        })();
      } catch (e) {
        console.log("FETCH BALANCE ERROR");
        console.log(e);
      }
    }
    if (balanceFetched) {
      console.log("ALL BALANCES FETCHED");
      console.log(balanceObject);
      try {
        (async function () {
          const res = await fetch(
            `/api/coinmarketcap/convert?from=link&to=eth`
          );
          const data = await res.json();
          const linkUsdValue = data.amount.from;
          const ethUsdValue = data.amount.to;

          const nextRes = await fetch(
            `/api/coinmarketcap/convert?from=bnb&to=eth`
          );
          const nextData = await nextRes.json();
          const bnbUsdValue = nextData.amount.from;
          let tempTotalValueMainnet = 0;
          let tempTotalValueTestnet = 0;
          let tempBalanceObjectInUSD: any = {};
          for (const [chainId, balances] of Object.entries(balanceObject)) {
            console.log(`Network ID: ${chainId}`);
            tempBalanceObjectInUSD[chainId] = {};
            for (const [token, balance] of Object.entries(balances as any)) {
              tempBalanceObjectInUSD[chainId][token] =
                (balance as any) *
                (token == "usdc" || token == "usdt"
                  ? 1
                  : token == "link"
                  ? linkUsdValue
                  : chainId == "56" || chainId == "97"
                  ? bnbUsdValue
                  : ethUsdValue);
              if (chainId == "1" || chainId == "56")
                tempTotalValueMainnet += tempBalanceObjectInUSD[chainId][token];
              else
                tempTotalValueTestnet += tempBalanceObjectInUSD[chainId][token];
            }
          }
          console.log("TEMP BALANCE OBJECT IN USD");
          console.log(tempBalanceObjectInUSD);
          setBalanceObjectInUSD(tempBalanceObjectInUSD);
          setTotalBalanceMainnet(tempTotalValueMainnet);
          setTotalBalanceTestnet(tempTotalValueTestnet);
        })();
      } catch (e) {
        console.log(e);
      }
    }
  }, [address, balanceFetched]);

  useEffect(() => {
    if (action == "swap" && pathname != "/pool") {
      // TODO: Make AI explain the page
      router.push("/pool");
    }

    if (action == "stake" && pathname != "/stake") {
      // TODO: Make AI explain the page
      router.push("/stake");
    }
  }, [action]);
  return (
    <>
      {access && (
        <div className="h-screen flex">
          <div className="px-8 w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-between">
              <div className="flex justify-between py-6 w-full">
                <div className="flex items-center">
                  <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
                  <MainNav
                    className="mx-6"
                    setOpenAi={async (path: string) => {
                      setThinking(true);
                      setOpenAi(true);
                      try {
                        const response = await axios.post("/api/classify", {
                          message: path,
                        });

                        console.log(response.data);
                        if (response.data.success == false)
                          throw Error("Error in response");
                        console.log(typeof response.data.response.response);
                        setConvos([
                          ...convos,
                          {
                            id: (convos.length + 1).toString(),
                            isAI: true,
                            message: response.data.response.response,
                          },
                        ]);
                        console.log({
                          id: (convos.length + 1).toString(),
                          isAI: true,
                          message: response.data.response.response,
                        });
                      } catch (e) {
                        console.log(e);
                        setConvos([
                          ...convos,
                          {
                            id: (convos.length + 1).toString(),
                            isAI: true,
                            message:
                              "There is something wrong with the AI. Please refresh the page and try again. If this issue persists, contact @marshal_14627 in Discord.",
                          },
                        ]);
                      }
                      setThinking(false);
                    }}
                  />
                </div>
                <div className="flex">
                  <ConnectButton />
                </div>
              </div>
            </div>

            <div className="flex flex-1 space-x-12 w-full">
              <div className="flex-1 flex flex-col w-full h-full">
                {status != "connected" ? <DefaultLanding /> : children}
              </div>
            </div>
          </div>

          <Button
            disabled={status != "connected"}
            className="z-10 absolute bottom-10 right-10 border-2 rounded-full border-muted-foreground bg-transparent border-none hover:border-none hover:bg-transparent"
            onClick={() => {
              setOpenAi(true);
            }}
          >
            <Image
              src={"/ai.gif"}
              height={80}
              width={80}
              alt="Logo"
              className=" rounded-full border-[2px]"
            />
          </Button>
          <Sheet
            open={openAi}
            onOpenChange={(open) => {
              setOpenAi(open);
            }}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="relative">
                  <ArrowRight
                    className="h-10 w-10 absolute -left-9 bg-background border-[1px]  p-2 text-WHITE cursor-pointer rounded-lg"
                    onClick={() => {
                      setOpenAi(false);
                    }}
                  />
                </SheetTitle>
                <SheetDescription className="h-screen">
                  <AIComponent
                    convos={convos}
                    setConvos={setConvos}
                    setClassifyResponse={setClassifyResponse}
                    thinking={thinking}
                    setAction={setAction}
                    setActionParams={setActionParams}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
