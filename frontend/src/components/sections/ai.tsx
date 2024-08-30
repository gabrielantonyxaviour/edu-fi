import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ReactTyped } from "react-typed";
import LoadingDots from "@/components/ui/loading-dots";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

export default function AIComponent({
  convos,
  setConvos,
  setClassifyResponse,
  thinking,
  setAction,
  setActionParams,
}: {
  convos: Convo[];
  setConvos: (convos: Convo[]) => void;
  setClassifyResponse: (response: any) => void;
  thinking: boolean;
  setAction: (action: string) => void;
  setActionParams: (params: string) => void;
}) {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="h-screen my-auto pt-6 flex flex-col bg-background ">
      <ScrollArea className="h-[85%] flex flex-col space-y-2 no-scrollbar">
        {convos.map((convo) => (
          <div
            key={convo.id}
            className={`flex text-xs ${
              convo.isAI ? "justify-start" : "justify-end"
            } items-center space-x-2 my-1`}
          >
            {convo.isAI && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={"/logo.png"} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            )}
            <Card className="max-w-[70%]">
              <CardContent className="py-2 px-3">
                <p className="">{convo.message}</p>
              </CardContent>
            </Card>
            {!convo.isAI && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={"/avatar.jpg"} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {(convos.length == 0 ||
          !convos[convos.length - 1].isAI ||
          thinking) && (
          <div
            key={convos.length}
            className={`flex text-sm justify-start items-center space-x-2`}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={"/logo.png"} alt="Avatar" className="" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <Card className="max-w-[70%]">
              <CardContent className="py-3">
                <LoadingDots />
              </CardContent>
            </Card>
          </div>
        )}
      </ScrollArea>
      <div className="flex mx-auto pt-4 w-full  px-2">
        <Input
          type="text"
          disabled={
            convos.length == 0 || !convos[convos.length - 1].isAI || thinking
          }
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Enter your prompt"
          className="text-xs sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        />
        <Button
          className="ml-2"
          size={"sm"}
          disabled={
            convos.length == 0 || !convos[convos.length - 1].isAI || thinking
          }
          onClick={async () => {
            try {
              const currentConvo = {
                id: (convos.length + 1).toString(),
                isAI: false,
                message: prompt,
              };
              setConvos([...convos, currentConvo]);
              const response = await axios.post("/api/classify", {
                message: prompt,
              });
              console.log(response.data);
              if (
                response.data.success == false ||
                response.data.response.response.length == 0
              )
                throw new Error("Error in response");
              setPrompt("");
              if (response.data.response.action != "")
                setAction(response.data.response.action);

              if (response.data.response.params != "")
                setActionParams(response.data.response.params);
              setConvos([
                ...convos,
                currentConvo,
                {
                  id: (convos.length + 1).toString(),
                  isAI: true,
                  message: response.data.response.response,
                },
              ]);

              setClassifyResponse(response.data.response);
            } catch (e) {
              console.log(e);
              setConvos([
                ...convos,
                {
                  id: (convos.length + 1).toString(),
                  isAI: true,
                  message:
                    "Sorry, there is a small issue with my brain. Can you please say that again?",
                },
              ]);
            }
          }}
        >
          <Icons.rightArrow className="h-3 w-3 fill-current" />
        </Button>
      </div>
    </div>
  );
}
