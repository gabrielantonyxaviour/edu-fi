import Image from "next/image";
import ConnectButton from "../ui/connect-button";

export default function DefaultLanding() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <p className="pt-6 font-bold text-2xl">Learnfi.ai</p>
      <p className="pb-6 font-semibold text-sm">
        Beginner friendly UniswapV3 on Educhain powered by AI
      </p>

      <Image
        src={"/hero.png"}
        height={200}
        width={600}
        alt="Avatar"
        className="rounded-md"
      />
      <div className="py-4 flex">
        <ConnectButton />
      </div>
    </div>
  );
}
