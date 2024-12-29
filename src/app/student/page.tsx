"use client";
import {
  AccountLayout,
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, TokenAccountsFilter } from "@solana/web3.js";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Course = {
  id: string;
  courseName: string;
  credits: number;
  status: string;
};
type User = {
  name: string;
};

function Page() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const pub = publicKey?.toString();
  const [user, setUser] = useState<User | null>(null);
  const [sub, setSub] = useState<Course[]>([]);
  const [currentSupply, setCurrentSupply] = useState<number | undefined>(
    undefined
  );
  const getUser = React.useCallback(async () => {
    const user = await axios.get(`/api/users/${pub}`);
    setUser(user.data);
  }, [pub]);
  const getSubjects = React.useCallback(async () => {
    const subjects = await axios.get(`/api/issue/${pub}`);
    setSub(subjects.data);
  }, [pub]);

  const getMetadata = React.useCallback(async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      publicKey as PublicKey,
      {
        programId: TOKEN_2022_PROGRAM_ID,
      } as TokenAccountsFilter
    );
    const accountData = AccountLayout.decode(
      tokenAccounts.value[0].account.data
    );
    const mintAddress = accountData.mint;
    const some = await getTokenMetadata(connection, mintAddress).then(
      (metadata) => {
        return {
          amount: accountData.amount.toString(),
          symbol: metadata?.symbol || "Token",
        };
      }
    );
    setCurrentSupply(Number(some.amount));
  }, [connection, publicKey]);

  useEffect(() => {
    getUser();
    getSubjects();
    getMetadata();
  }, [publicKey, getUser, getSubjects]);
  return (
    <div className=" px-96 py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen">
      <div className="  flex justify-between items-end">
        <h1 className="text-3xl font-serif">
          Welcome, {user?.name} 👋
        </h1>
        <WalletDisconnectButton />
      </div>
      <div className="py-12 flex justify-between gap-4">
        <div className="border w-full rounded-md p-4 flex items-center  gap-2 text-sm font-thin shadow-md">
          Subjects
          <br /> Enrolled<span className="text-4xl">{sub.length}</span>
        </div>
        <div className="border w-full rounded-md p-4 flex items-center gap-2 text-sm font-thin shadow-md">
          Credits
          <br /> Completed
          <span className="text-4xl">{(currentSupply ?? 0) / 1000000000}</span>
        </div>
        <div className="border w-full rounded-md p-4 flex items-center gap-2 text-sm font-thin shadow-md">
          To Get
          <br /> Certificate
          <span className="text-4xl">
            {(currentSupply ?? 0) / 1000000000}/164
          </span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center gap-2 text-sm font-thin shadow-md">
          <a
            href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 rounded-md hover:bg-gray-200 w-full hover:text-gray-800"
          >
            Check Transaction
          </a>
          {currentSupply !== undefined && currentSupply >= 164000000000 ? (
            <button onClick={()=>router.push('/certificates')} className="border p-2 rounded-md  hover:bg-gray-200 w-full hover:text-gray-800">
              Get Certificate
            </button>
          ) : (
            <button onClick={()=> alert("You are not completed 164 credits")} className="border p-2 rounded-md cursor-not-allowed hover:bg-gray-200 w-full hover:text-gray-800">
              Get Certificate
            </button>
          )}
        </div>
      </div>
      <div className="border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" text-gray-300">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Credits
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {sub?.map((course: Course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {course.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {course.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {course.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={()=>router.push("/")} className='absolute top-8 left-8 flex items-center gap-2 p-4 bg-white rounded-full shadow-lg text-purple-900 hover:scale-110 hover:border hover:text-white hover:bg-purple-900 transition-all duration-75'>
            <ArrowLeft /> Back
        </button>
    </div>
  );
}

export default Page;
