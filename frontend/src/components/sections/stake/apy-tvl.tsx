import { CardContent } from "@/components/ui/card";

export default function ApyTvl() {
  return (
    <>
      <div className="flex justify-between pt-4 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">APY</p>
        <p className="font-medium text-sm text-whtie">2.98%</p>
      </div>
      <div className="flex justify-between pt-1 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">TVL (ETH)</p>
        <p className="font-medium text-sm text-whtie">179,159 ( ≈ $481.63M)</p>
      </div>
    </>
  );
}
