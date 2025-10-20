"use client";

import {
  ConnectButton,
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState, useEffect } from "react";

export default function Home() {
  const currentAccount = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const suiClient = useSuiClient();
  const [txDigest, setTxDigest] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Function to fetch SUI balance
  const fetchBalance = async () => {
    if (!currentAccount) {
      setBalance(null);
      return;
    }

    setBalanceLoading(true);
    try {
      const balanceData = await suiClient.getBalance({
        owner: currentAccount.address,
        coinType: "0x2::sui::SUI",
      });

      // Convert from MIST to SUI (1 SUI = 10^9 MIST)
      const suiBalance = (
        Number(balanceData.totalBalance) /
        1_000_000_000
      ).toFixed(4);
      setBalance(suiBalance);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setBalance("Error");
    } finally {
      setBalanceLoading(false);
    }
  };

  // Fetch balance when account changes
  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount]);

  const handleExecuteTransaction = async () => {
    if (!currentAccount) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError("");
    setTxDigest("");

    try {
      // 1) Create transaction (clock access)
      const tx = new Transaction();
      tx.moveCall({
        target:
          "0xfa0e78030bd16672174c2d6cc4cd5d1d1423d03c28a74909b2a148eda8bcca16::clock::access",
        arguments: [tx.object("0x6")],
      });

      // Build transaction kind
      const txKindBytes = await tx.build({
        client: suiClient as any,
        onlyTransactionKind: true,
      });

      // Convert to base64 (browser-compatible way)
      const txKindB64 = btoa(
        String.fromCharCode(...new Uint8Array(txKindBytes))
      );

      console.log("Transaction kind built:", {
        bytes: txKindBytes.length,
        base64: txKindB64.slice(0, 50) + "...",
      });

      // 2) Get sponsorship from API route (server-side to avoid CORS)
      const requestBody = {
        txKind: txKindB64,
        sender: currentAccount.address,
      };

      console.log("Calling /api/sponsor with:", {
        sender: requestBody.sender,
        txKindLength: requestBody.txKind.length,
      });

      const sponsorResponse = await fetch("/api/sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Sponsor response status:", sponsorResponse.status);

      if (!sponsorResponse.ok) {
        const errorData = await sponsorResponse.json();
        throw new Error(errorData.error || "Failed to get sponsorship");
      }

      const sponsorship = await sponsorResponse.json();

      // 3) Sign transaction with connected wallet
      const signedTx = await signTransaction({
        transaction: Transaction.from(sponsorship.txBytes) as any,
      });

      // 4) Execute transaction (sponsor signature + sender signature)
      const exec = await suiClient.executeTransactionBlock({
        transactionBlock: sponsorship.txBytes,
        signature: [signedTx.signature, sponsorship.signature],
      });

      setTxDigest(exec.digest);

      // Refresh balance after successful transaction
      // Wait a bit for the transaction to be processed
      setTimeout(() => {
        fetchBalance();
      }, 2000);
    } catch (err: any) {
      console.error("Error executing transaction:", err);
      setError(err.message || "Failed to execute transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-center">Gas Station Demo</h1>

        <div className="flex flex-col gap-4 items-center">
          <ConnectButton />

          {currentAccount && (
            <div className="flex flex-col gap-2 items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Connected: {currentAccount.address.slice(0, 6)}...
                {currentAccount.address.slice(-4)}
              </div>
              <div className="text-sm font-medium">
                {balanceLoading ? (
                  <span className="text-gray-500">Loading balance...</span>
                ) : balance !== null ? (
                  <span
                    className={
                      Number(balance) === 0
                        ? "text-red-600 dark:text-red-400 font-bold"
                        : "text-green-600 dark:text-green-400"
                    }
                  >
                    Balance: {balance} SUI
                    {Number(balance) === 0 && " (Gas Station will sponsor!)"}
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <button
            onClick={handleExecuteTransaction}
            disabled={!currentAccount || loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Executing..." : "Execute Transaction (Clock Access)"}
          </button>

          {error && (
            <div className="w-full p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          )}

          {txDigest && (
            <div className="w-full p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-200 font-medium mb-2">
                Transaction Successful!
              </p>
              <p className="text-xs text-green-600 dark:text-green-300 break-all">
                Digest: {txDigest}
              </p>
              <a
                href={`https://testnet.suivision.xyz/txblock/${txDigest}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 block"
              >
                View on Explorer →
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-2xl">
          <h2 className="text-xl font-semibold mb-3">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Connect your Sui wallet (Sui Wallet, Suiet, etc.)</li>
            <li>
              Click the button to execute a transaction that accesses the clock
              object
            </li>
            <li>
              The transaction is sponsored by the Gas Station (you don&apos;t pay
              gas fees!)
            </li>
            <li>Your wallet signs the transaction</li>
            <li>The transaction is executed on Sui testnet</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
