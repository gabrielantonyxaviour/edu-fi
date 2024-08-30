import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function PasscodeDialog({
  passcode,
  setPasscode,
  setAccess,
}: {
  passcode: string;
  setPasscode: any;
  setAccess: any;
}) {
  const [submittedPasscode, setSubmittedPasscode] = useState("");
  const [wrong, setWrong] = useState(false);
  const PASSCODE = process.env.NEXT_PUBLIC_PASSCODE;
  return (
    <Dialog open={submittedPasscode != PASSCODE}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hey there</DialogTitle>
          <DialogDescription>
            <p>
              This is private website. Please enter the passcode to continue.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Passcode
            </Label>
            <Input
              id="name"
              value={passcode}
              onChange={(e) => {
                setWrong(false);
                setPasscode(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        {wrong && <p className="text-red-500 text-end">Wrong password!</p>}
        <DialogFooter>
          <Button
            onClick={() => {
              if (passcode != PASSCODE) {
                setWrong(true);
                setPasscode("");
              } else {
                setSubmittedPasscode(passcode);
                setAccess(true);
              }
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
