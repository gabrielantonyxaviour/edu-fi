import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import {
  supportedchains,
  supportedcoins,
  swapRouterAbi,
} from "@/lib/constants";
import Image from "next/image";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useAccount, useWriteContract } from "wagmi";
import { erc20Abi, parseEther, zeroAddress } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/lib/config";
export default function Transaction({
  open,
  setOpen,
  action,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}) {
  const [completedTxs, setCompletedTxs] = useState(0);
  const [approveTx, setApproveTx] = useState("");
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [txStarted, setTxStarted] = useState(0);
  useEffect(() => {
    if (approveTx != "") {
      toast({
        title: "Approve Tokens Confirmed",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || 11155111).toString()].explorer +
                "tx/" +
                approveTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [approveTx]);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: `${action == "swap" ? "Swap" : "Order"} Confirmed`,
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
          <DialogTitle>
            Confirm {action == "swap" ? "Swap" : "Order"}
          </DialogTitle>
          <DialogDescription>
            <p>Check the summary of the transaction</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full text-center items-center text-sm">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p>From</p>
            <Image
              src={supportedcoins[fromToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(fromAmount)}{" "}
              {supportedcoins[fromToken].symbol}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <ArrowBigRight size={30} />
            <ArrowBigLeft size={30} />
          </div>
          <div className="flex flex-col space-y-3">
            <p>To</p>
            <Image
              src={supportedcoins[toToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(toAmount)} {supportedcoins[toToken].symbol}
            </p>
          </div>
        </div>
        <DialogFooter>
          {fromToken != "nativeEth" && fromToken != "nativeBnb" && (
            <Button
              disabled={
                completedTxs > 0 || (txStarted == 1 && completedTxs == 0)
              }
              onClick={async () => {
                setTxStarted(1);
                try {
                  const tx = await writeContractAsync({
                    abi: erc20Abi,
                    address:
                      supportedcoins[fromToken].token[chainId || 11155111],
                    functionName: "approve",
                    args: [
                      supportedchains[(chainId || 11155111).toString()]
                        .swapRouter,
                      BigInt(parseEther(fromAmount)),
                    ],
                  });
                  const txReceipt = await waitForTransactionReceipt(config, {
                    hash: tx,
                  });
                  setApproveTx(tx);
                  setCompletedTxs(completedTxs + 1);
                } catch (e) {
                  console.log(e);
                  setTxStarted(0);
                }
              }}
            >
              {txStarted == 1 && completedTxs == 0 ? (
                <div className="black-spinner"></div>
              ) : (
                `Approve ${supportedcoins[fromToken].symbol}`
              )}
            </Button>
          )}
          <Button
            disabled={
              (completedTxs == 0 || (txStarted == 2 && completedTxs == 1)) &&
              fromToken != "nativeEth" &&
              fromToken != "nativeBnb"
            }
            onClick={async () => {
              setTxStarted(2);
              try {
                const tx = await writeContractAsync({
                  abi: swapRouterAbi,
                  address:
                    supportedchains[(chainId || 11155111).toString()]
                      .swapHelper,
                  functionName: "swap",
                  args: [
                    fromToken == "nativeEth" || fromToken == "nativeBnb"
                      ? zeroAddress
                      : supportedcoins[fromToken].token[chainId || 11155111],
                    toToken == "nativeEth"
                      ? zeroAddress
                      : supportedcoins[toToken].token[chainId || 11155111],
                    BigInt(parseEther(fromAmount)),
                  ],
                  value:
                    fromToken == "nativeEth"
                      ? BigInt(parseEther(fromAmount))
                      : BigInt(0),
                });
                setActionTx(tx);

                setCompletedTxs(completedTxs + 1);
              } catch (e) {
                setTxStarted(1);
                console.log(e);
              }
            }}
          >
            {action == "swap" ? "Perform Swap" : "Create Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
