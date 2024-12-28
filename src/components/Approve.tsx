"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction
} from '@solana/web3.js';
import { 
  TOKEN_2022_PROGRAM_ID,  // Using TOKEN_2022_PROGRAM_ID instead of TOKEN_PROGRAM_ID
  createTransferInstruction, 
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getMint
} from '@solana/spl-token';

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
  const TOKEN_MINT = new PublicKey("9Vtd85wimyq9Krttcv8pDYACTy9LWvzf1yxRXo4Fbq74");
  
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
        console.log("Recipient ATA doesn't exist, creating one...",error);
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
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction sent:", signature);

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed!");
      }

      console.log("Transaction confirmed:", signature);
      alert(`Transaction successful! Signature: ${signature}`);
      
      // Refresh the course list
      async function updateCourse(){
        try{
          await axios.put(`/api/issue/${course.walletAddress}`, { status: "Approved" });
        }catch(err){
          console.log(err);
        }
      }
      updateCourse()
      getCourses();

    } catch (error) {
      console.error("Error processing transaction:", error);
      alert(`Transaction failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border text-gray-300 px-8 py-6 rounded-md w-full h-96 overflow-y-scroll shadow-md">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-bold">Pending Approvals</h1>
      </div>
      <ul className="border-gray-500">
        {courses.length === 0 ? (
          <li>Loading...</li>
        ) : (
          courses.map((course) => (
            <li
              key={course._id}
              className="text-md border-b p-2 rounded-sm transition-all delay-75 flex justify-between items-center"
            >
              <div className="flex gap-3">
                <p>{course?.name}</p>
                <p>{course?.courseName}</p>
                <p>{course?.credits} Credits</p>
              </div>
              <button
                onClick={() => handleApprove(course)}
                disabled={!connected || isLoading}
                className="border p-1 px-3 rounded-md hover:bg-gray-200 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
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