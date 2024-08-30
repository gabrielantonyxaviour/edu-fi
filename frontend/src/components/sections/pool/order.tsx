import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import From from "./from";
import To from "./to";
import { useAccount } from "wagmi";
import Spinner from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface OrderProps {
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  sellingPrice: string;
  setSellingPrice: (sellingPrice: string) => void;
  sellingPriceLoading: boolean;
  triggerAction: () => void;
  isTestnet: boolean;
}

export default function Order({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  toAmount,
  setSellingPrice,
  sellingPrice,
  sellingPriceLoading,
  triggerAction,
  isTestnet,
}: OrderProps) {
  const { chainId } = useAccount();
  if (chainId == undefined)
    return (
      <div className="w-[75%] flex flex-col justify-center items-center ">
        <Spinner />
      </div>
    );
  return (
    <Card className="border-none w-[500px] ">
      <CardContent className="">
        <From
          toToken={toToken}
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          fromToken={fromToken}
          setFromToken={setFromToken}
          fromBalance={"0"}
          isTestnet={isTestnet}
        />
        <To
          fromToken={fromToken}
          toAmount={toAmount}
          toToken={toToken}
          setToToken={setToToken}
          toLoading={sellingPriceLoading}
          isTestnet={isTestnet}
        />
        <div className="flex justify-between items-center ">
          <p className="text-sm font-medium">
            Pay {fromToken.toUpperCase()} at price
          </p>
          <Input
            className="text-sm font-medium border-none w-[50%] my-3 text-right hover:border-none"
            value={sellingPrice}
            onChange={(e) => {
              setSellingPrice(e.target.value);
            }}
          />
          <p className="text-sm font-medium">USD</p>
        </div>

        <Button
          variant={"default"}
          className="w-full font-bold"
          onClick={() => {
            triggerAction();
          }}
          disabled={true}
        >
          Coming Soon
        </Button>
        <div className="flex justify-end pt-2 text-muted-foreground space-x-1">
          <p className="font-semibold text-xs">Powered By </p>
          <Image
            src="/oneinch.jpg"
            width={18}
            height={20}
            alt=""
            className="rounded-full"
          />
          <p className="font-semibold text-xs">1inch </p>
        </div>
      </CardContent>
    </Card>
  );
}
