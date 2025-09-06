"use client";

import {
  useMiniKit,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

interface Badge {
  wallet: string;
  event: string;
  date: string;
  image: string;
}

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    if (address) {
      const savedBadges = localStorage.getItem(`badges_${address}`);
      if (savedBadges) {
        const badges = JSON.parse(savedBadges);
        setBadgeClaimed(badges.length > 0);
      }
    }
  }, [address]);

  const handleClaimBadge = () => {
    if (!address) return;

    const newBadge: Badge = {
      wallet: address,
      event: "Base Hackathon 2025",
      date: new Date().toISOString(),
      image: "https://via.placeholder.com/200"
    };

    const existingBadges = localStorage.getItem(`badges_${address}`);
    const badges = existingBadges ? JSON.parse(existingBadges) : [];
    
    // Check if badge already exists for this event
    const hasExistingBadge = badges.some((badge: Badge) => 
      badge.event === newBadge.event && badge.wallet === address
    );

    if (!hasExistingBadge) {
      badges.push(newBadge);
      localStorage.setItem(`badges_${address}`, JSON.stringify(badges));
      setBadgeClaimed(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--app-foreground)] mb-2">
            Base MiniApp
          </h1>
          <p className="text-[var(--app-foreground-muted)]">
            Connect your wallet to get started
          </p>
        </header>

        <main className="flex-1 space-y-6">
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">
                Wallet Connection
              </h2>
              
              <div className="flex justify-center mb-6">
                <Wallet className="z-10">
                  <ConnectWallet>
                    <div className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-3 rounded-lg font-medium transition-colors">
                      Connect Wallet
                    </div>
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>

              <p className="text-[var(--app-foreground-muted)] text-sm">
                Click the button above to connect your wallet and see your address
              </p>
            </div>
          </div>

          {isConnected && (
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">
                  Claim Your Badge
                </h2>
                
                {badgeClaimed ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-[var(--app-accent)]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Badge Claimed!</span>
                    </div>
                    <p className="text-[var(--app-foreground-muted)] text-sm">
                      You&apos;ve successfully claimed your Base Hackathon 2025 badge
                    </p>
                    <Link 
                      href="/badges"
                      className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                    >
                      View My Badges
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-[var(--app-foreground-muted)] text-sm mb-4">
                      Claim your exclusive Base Hackathon 2025 badge!
                    </p>
                    <button
                      onClick={handleClaimBadge}
                      className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Claim Badge
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isConnected && (
            <div className="text-center">
              <Link 
                href="/badges"
                className="text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] text-sm font-medium transition-colors"
              >
                View My Badges →
              </Link>
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <p className="text-[var(--ock-text-foreground-muted)] text-xs">
            Built on Base with MiniKit
          </p>
        </footer>
      </div>
    </div>
  );
}
