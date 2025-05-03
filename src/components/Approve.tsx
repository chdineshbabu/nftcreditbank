"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID, // Using TOKEN_2022_PROGRAM_ID instead of TOKEN_PROGRAM_ID
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getMint,
} from "@solana/spl-token";

interface Course {
  _id: string;
  courseName: string;
  name: string;
  courseDescription: string;
  credits: number;
  walletAddress: string;
}

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  // Replace with your token mint address
  const TOKEN_MINT = new PublicKey(
    "9Vtd85wimyq9Krttcv8pDYACTy9LWvzf1yxRXo4Fbq74"
  );

  async function getCourses() {
    try {
      const res = await axios.get("/api/issue");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  const handleApprove = async (course: Course) => {
    if (!publicKey || !connected) {
      alert("Please connect your wallet first!");
      return;
    }

    setIsLoading(true);
    try {
      const recipientPubKey = new PublicKey(course.walletAddress);

      // Get token mint info to determine decimals using TOKEN_2022_PROGRAM_ID
      const mintInfo = await getMint(
        connection,
        TOKEN_MINT,
        undefined,
        TOKEN_2022_PROGRAM_ID
      );

      // Calculate amount based on token decimals
      const amount = course.credits * Math.pow(10, mintInfo.decimals);

      // Get the associated token accounts for sender and recipient using TOKEN_2022_PROGRAM_ID
      const senderATA = await getAssociatedTokenAddress(
        TOKEN_MINT,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const recipientATA = await getAssociatedTokenAddress(
        TOKEN_MINT,
        recipientPubKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      // Create a new transaction
      const transaction = new Transaction();

      // Check if recipient ATA exists
      let recipientATAExists = false;
      try {
        await getAccount(
          connection,
          recipientATA,
          undefined,
          TOKEN_2022_PROGRAM_ID
        );
        recipientATAExists = true;
      } catch (error) {
        console.log(error);
      }

      // If recipient ATA doesn't exist, add instruction to create it
      if (!recipientATAExists) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            recipientATA, // ATA address
            recipientPubKey, // owner
            TOKEN_MINT, // mint
            TOKEN_2022_PROGRAM_ID // Using TOKEN_2022_PROGRAM_ID
          )
        );
      }

      // Add transfer instruction with TOKEN_2022_PROGRAM_ID
      const transferInstruction = createTransferInstruction(
        senderATA, // source
        recipientATA, // destination
        publicKey, // owner of source account
        BigInt(amount), // amount to transfer
        [], // no multisig
        TOKEN_2022_PROGRAM_ID // Using TOKEN_2022_PROGRAM_ID
      );

      transaction.add(transferInstruction);

      // Get latest blockhash
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed!");
      }
      alert(`Transaction successful! Signature: ${signature}`);

      // Refresh the course list
      async function updateCourse() {
        try {
          await axios.put(`/api/issue/${course.walletAddress}`, {
            status: "Approved",
          });
        } catch (err) {
          console.log(err);
        }
      }
      updateCourse();
      
      getCourses();
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert(`Transaction failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl h-96 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl p-6 shadow-lg overflow-y-scroll border border-gray-700 text-gray-300">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold text-white">Pending Approvals</h1>
      </div>
      <ul className="divide-y divide-gray-600">
        {courses.length === 0 ? (
          <li className="text-center py-4 text-gray-400"></li>
        ) : (
          courses.map((course) => (
            <li
              key={course._id}
              className="flex justify-between items-center py-3 px-4 bg-gray-700 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-black rounded-lg shadow-sm transition-all delay-75"
            >
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <p className="font-semibold">{course?.name}</p>
                <p className="text-sm ">{course?.courseName}</p>
                <p className="text-sm ">
                  {course?.credits} Credits
                </p>
              </div>
              <button
                onClick={() => handleApprove(course)}
                disabled={!connected || isLoading}
                className="text-sm font-medium bg-gray-800 border border-cyan-500 hover:bg-cyan-500 hover:text-black text-cyan-400 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Approve NFT"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CourseList;
