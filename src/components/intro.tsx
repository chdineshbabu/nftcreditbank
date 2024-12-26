"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

function Intro() {
  const { wallet } = useWallet();
  const router = useRouter();
  return (
    <div>
      {wallet ? (
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-xl font-semibold">Wallet connected</h1>
          <button onClick={()=>router.push("/check")}>Let&apos;s Go</button>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center gap-4">
          <h1 className="text-xl font-semibold">
            Wallet not connected, please connect your wallet
          </h1>{" "}
          <WalletMultiButton />
        </div>
      )}
    </div>
  );
}

export default Intro;
