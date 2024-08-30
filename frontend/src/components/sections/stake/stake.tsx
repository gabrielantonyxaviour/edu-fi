import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { roundUpToFiveDecimals } from "@/lib/utils";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";

export default function Stake({
  stakeAmount,
  setStakeAmount,
  balance,
}: {
  stakeAmount: string;
  setStakeAmount: (stakeAmount: string) => void;
  balance: string;
}) {
  return (
    <Card className="mt-3 mx-3">
      <CardContent className="py-2 px-5">
        <div className="pt-2  rounded-lg">
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center ">
              <Image
                src={"/coins/ethereum.png"}
                width={20}
                height={20}
                alt=""
                className="rounded-full"
              />
              <p className="text-xl font-bold  px-2">ETH</p>
            </div>
            <Input
              className="font-semibold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 bg-transparent border-none w-[50%] text-right  text-xl"
              value={stakeAmount}
              onChange={(e) => {
                const decimalRegex = /^\d+(\.\d*)?$/;
                if (decimalRegex.test(e.target.value) || e.target.value == "")
                  setStakeAmount(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between items-center font-semibold">
            <p className="text-xs text-muted-foreground ">
              Balance: {roundUpToFiveDecimals(balance)}
            </p>

            <div className="flex justify-center">
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  setStakeAmount("0");
                }}
                className=" text-muted-foreground px-2 py-1 text-xs"
              >
                RESET
              </Button>
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  setStakeAmount(balance);
                }}
                className=" text-xs text-muted-foreground py-1 px-2 hover:text-black hover:bg-white"
              >
                MAX
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
