"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import "@/styles/spinner.css";
export default function StakeTransaction({
  stakeAmount,
  open,
  setOpen,
  stoneAmount,
}: {
  stakeAmount: string;
  stoneAmount: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [txStarted, setTxStarted] = useState(false);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: `Stake Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || 11155111).toString()].explorer +
                "tx/" +
                actionTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [actionTx]);
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Stake</DialogTitle>
          <DialogDescription>
            <p>Check the summary of the transaction</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full text-center items-center text-sm">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p>From</p>
            <Image
              src={"/coins/ethereum.png"}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto rounded-full"
            />
            <p>{roundUpToFiveDecimals(stakeAmount)} ETH</p>
          </div>
          <div className="flex flex-col justify-center">
            <ArrowBigRight size={30} />
            <ArrowBigLeft size={30} />
          </div>
          <div className="flex flex-col space-y-3">
            <p>To</p>
            <Image
              src={"/coins/stakestone.jpg"}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto rounded-full"
            />
            <p>{roundUpToFiveDecimals(stoneAmount)} STONE</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={txStarted}
            onClick={async () => {
              setTxStarted(true);
              try {
                const tx = await writeContractAsync({
                  abi: [
                    {
                      inputs: [],
                      name: "deposit",
                      outputs: [
                        {
                          internalType: "uint256",
                          name: "mintAmount",
                          type: "uint256",
                        },
                      ],
                      stateMutability: "payable",
                      type: "function",
                    },
                  ],
                  address:
                    supportedchains[(chainId || 11155111).toString()].stake,
                  functionName: "deposit",
                  args: [],
                  value: BigInt(parseEther(stakeAmount)),
                });
                setActionTx(tx);
              } catch (e) {
                console.log(e);
                setTxStarted(false);
              }
            }}
          >
            {txStarted ? (
              <div className="black-spinner"></div>
            ) : (
              `Deposit Stake`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
