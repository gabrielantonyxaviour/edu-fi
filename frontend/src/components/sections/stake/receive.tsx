import { CardContent } from "@/components/ui/card";
import { roundUpToFiveDecimals } from "@/lib/utils";

export default function Receive({
  stonePrice,
  stoneAmount,
}: {
  stonePrice: string;
  stoneAmount: string;
}) {
  return (
    <>
      <div className="flex justify-between pt-4 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">
          You will receive
        </p>
        <p className="font-medium text-sm text-whtie">{stoneAmount} STONE</p>
      </div>
      <div className="flex justify-between pt-1 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">
          Exchange Rate
        </p>
        <p className="font-medium text-sm text-whtie">
          1 STONE = {roundUpToFiveDecimals(stonePrice)} ETH
        </p>
      </div>
    </>
  );
}
