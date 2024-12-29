"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WalletIcon, GraduationCap, ShieldCheck, Zap } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { wallet } = useWallet();
  const router = useRouter();
  const handleClicked = () => {
    if (wallet) {
      router.push("/check");
    }else{
      alert("Please connect your wallet");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <header className="mx-32  px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">NFTCrediti Bank</div>
          <WalletMultiButton />
        </nav>
      </header>

      <main className="mx-32 px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extralight mb-6 leading-tight">
              Revolutionize Your Academic Journey with Blockchain
            </h1>
            <p className="text-xl mb-8 font-extralight text-gray-300">
              Secure, manage, and showcase your academic achievements as NFTs.
              Welcome to the future of education credentials.
            </p>
            <button onClick={()=>handleClicked()} className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="relative z-10 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: GraduationCap,
                    title: "Academic NFTs",
                    desc: "Tokenize your credits",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure Blockchain",
                    desc: "Immutable records",
                  },
                  {
                    icon: Zap,
                    title: "Instant Transfers",
                    desc: "Quick credit moves",
                  },
                  {
                    icon: WalletIcon,
                    title: "Digital Wallet",
                    desc: "Manage your assets",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
