"use client"
import { AccountLayout, getMint, getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TokenAccountsFilter } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

function AdminHeader() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [mint, setMint] = useState<string>("");
  const [currentSupply, setCurrentSupply] = useState<number>(0);
  const getMetadata = React.useCallback(async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey as PublicKey, {
      programId: TOKEN_2022_PROGRAM_ID,
    } as TokenAccountsFilter);
    const accountData = AccountLayout.decode(tokenAccounts.value[0].account.data);
    const mintAddress = accountData.mint;
    setMint(mintAddress.toString());
    const metadata = await getMint(connection, mintAddress, undefined, TOKEN_2022_PROGRAM_ID);
    console.log("Metadata: ", metadata.supply);
    setTotalSupply(Number(metadata.supply));
    console.log("Total Supply: ", metadata.supply.toString());
    const some = await getTokenMetadata(connection, mintAddress).then((metadata) => {
      return {
        amount: accountData.amount.toString(),
        symbol: metadata?.symbol || "Token",
      };
    });
    setCurrentSupply(Number(some.amount));
  }, [connection, publicKey]);
  useEffect(() => {
    getMetadata();
  }, [getMetadata]);

  return (
    <div className="bg-gradient-to-br mx-8 mb-4 from-gray-800 via-gray-700 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700 text-gray-300">
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center bg-gray-800 p-3 rounded-lg shadow-md border border-gray-600 hover:bg-gradient-to-r from-cyan-500 to-blue-500 transition-all">
          <h2 className="text-sm font-semibold text-gray-300">Total Supply</h2>
          <span className="text-2xl text-white">{totalSupply / 1000000000} VTU</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600 hover:bg-gradient-to-r from-cyan-500 to-blue-500 transition-all">
          <h2 className="text-sm font-semibold text-gray-300">Current Supply</h2>
          <span className="text-2xl  text-white">{currentSupply / 1000000000} VTU</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600 hover:bg-gradient-to-r from-cyan-500 to-blue-500 transition-all">
          <h2 className="text-sm font-semibold text-gray-300">Certificates Issued</h2>
          <span className="text-2xl text-white">0</span>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600">
          <a href={`https://explorer.solana.com/address/${mint}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer" 
            className="w-full py-2 text-center text-sm font-semibold bg-gray-700 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all">
            Verify Transactions
          </a>
          <a
          href={`https://forgetoken.vercel.app/`}
          target="_blank"
          rel="noopener noreferrer"  
          className="w-full py-2 text-center text-sm font-semibold bg-gray-700 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all">
            Mint Tokens
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
