import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import From from "./from";
import To from "./to";
import { useAccount, useSwitchChain } from "wagmi";
import Slippage from "./slippage";
import Spinner from "@/components/ui/loading";
import Image from "next/image";
interface SwapProps {
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  fromBalance: string;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  slippage: string;
  setSlippage: (slippage: string) => void;
  toLoading: boolean;
  isTestnet: boolean;
  triggerAction: () => void;
  openTransaction: boolean;
}

export default function Swap({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  toAmount,
  setSlippage,
  slippage,
  fromBalance,
  toLoading,
  triggerAction,
  openTransaction,
  isTestnet,
}: SwapProps) {
  const { chainId } = useAccount();
  if (chainId == undefined)
    return (
      <div className="w-[75%] flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <Card className="border-none w-[500px] ">
      <CardContent className="relative ">
        {/* <div className="absolute bg-white w-[10px] h-[10px] left-[50%] top-[50%]"></div> */}
        <From
          toToken={toToken}
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          fromToken={fromToken}
          fromBalance={fromBalance}
          setFromToken={setFromToken}
          isTestnet={isTestnet}
        />
        <To
          fromToken={fromToken}
          toAmount={toAmount}
          toToken={toToken}
          setToToken={setToToken}
          isTestnet={isTestnet}
          toLoading={toLoading}
        />
        <Slippage slippage={slippage} setSlippage={setSlippage} />
        <Button
          variant={"default"}
          className="w-full font-bold"
          onClick={() => {
            triggerAction();
          }}
          disabled={
            openTransaction ||
            parseFloat(fromAmount) == 0 ||
            fromAmount == "" ||
            parseFloat(fromAmount) > parseFloat(fromBalance)
          }
        >
          {openTransaction ? (
            <div className="black-spinner"></div>
          ) : parseFloat(fromAmount) == 0 || fromAmount == "" ? (
            "Enter Amount"
          ) : parseFloat(fromAmount) > parseFloat(fromBalance) ? (
            "Insufficient Funds"
          ) : (
            "Swap"
          )}
        </Button>
        <div className="flex justify-end pt-2 text-muted-foreground space-x-1">
          <p className="font-semibold text-xs">Powered By </p>
          <Image
            src="/uniswap.png"
            width={18}
            height={20}
            alt=""
            className="rounded-full bg-white"
          />
          <p className="font-semibold text-xs">Uniswap </p>
        </div>
      </CardContent>
    </Card>
  );
}
