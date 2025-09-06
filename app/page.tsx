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
import BadgeIcon from "./components/BadgeIcon";

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
      image: "local-badge"
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
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-gradient-to-br from-[var(--app-background)] via-[var(--app-gray-light)] to-[var(--app-gray)]">
      <div className="w-full max-w-lg mx-auto px-6 py-12">
        <header className="text-center mb-12 animate-slide-in-up">
          <div className="mb-6">
            <BadgeIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-3 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
            Base MiniApp
          </h1>
          <p className="text-lg text-[var(--app-foreground-muted)] max-w-md mx-auto leading-relaxed">
            Connect your wallet and claim your exclusive hackathon badge
          </p>
        </header>

        <main className="flex-1 space-y-8">
          <div className="glass-effect rounded-2xl shadow-xl border border-[var(--app-card-border)] p-8 animate-fade-in-scale">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
                Connect Your Wallet
              </h2>
              
              <div className="flex justify-center mb-8">
                <Wallet className="z-10">
                  <ConnectWallet>
                    <div className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
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

              <p className="text-[var(--app-foreground-muted)] text-sm leading-relaxed">
                Secure connection to claim your exclusive Base Hackathon 2025 badge
              </p>
            </div>
          </div>

          {isConnected && (
            <div className="gradient-border p-8 animate-slide-in-up">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
                  Claim Your Badge
                </h2>
                
                {badgeClaimed ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-3 text-[var(--app-success)]">
                      <div className="w-12 h-12 bg-[var(--app-success-light)] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">Badge Claimed!</span>
                    </div>
                    <p className="text-[var(--app-foreground-muted)] text-base">
                      You&apos;ve successfully claimed your Base Hackathon 2025 badge
                    </p>
                    <Link 
                      href="/badges"
                      className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
                    >
                      View My Badges
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <BadgeIcon className="w-24 h-24 mx-auto mb-4" />
                      <p className="text-[var(--app-foreground-muted)] text-base leading-relaxed">
                        Claim your exclusive Base Hackathon 2025 badge and join the community!
                      </p>
                    </div>
                    <button
                      onClick={handleClaimBadge}
                      className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Claim Badge
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isConnected && !badgeClaimed && (
            <div className="text-center animate-fade-in-scale">
              <Link 
                href="/badges"
                className="inline-flex items-center gap-2 text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] font-medium transition-colors text-base"
              >
                View My Badges
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-[var(--app-card-border)]">
          <div className="text-center">
            <p className="text-[var(--app-foreground-muted)] text-sm">
              Built on Base with MiniKit
            </p>
            <p className="text-[var(--app-foreground-muted)] text-xs mt-2">
              Secure • Fast • Reliable
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
