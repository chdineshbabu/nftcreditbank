"use client"
import React from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=90aa40ff-d8d9-465c-8f90-4e74812913a0">
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default Provider;