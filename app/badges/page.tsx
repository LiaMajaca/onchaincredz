"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Link from "next/link";
import BadgeIcon from "../components/BadgeIcon";

interface Badge {
  wallet: string;
  event: string;
  date: string;
  image: string;
}

export default function BadgesPage() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    if (address) {
      const savedBadges = localStorage.getItem(`badges_${address}`);
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      }
    }
  }, [address]);

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-gradient-to-br from-[var(--app-background)] via-[var(--app-gray-light)] to-[var(--app-gray)]">
        <div className="w-full max-w-lg mx-auto px-6 py-12">
          <header className="text-center mb-12 animate-slide-in-up">
            <div className="mb-6">
              <BadgeIcon className="w-20 h-20 mx-auto mb-4" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-3 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
              My Badges
            </h1>
            <p className="text-lg text-[var(--app-foreground-muted)] max-w-md mx-auto leading-relaxed">
              Connect your wallet to view your badge collection
            </p>
          </header>

          <div className="glass-effect rounded-2xl shadow-xl border border-[var(--app-card-border)] p-8 text-center animate-fade-in-scale">
            <p className="text-[var(--app-foreground-muted)] mb-6 text-base">
              Please connect your wallet to view your badges
            </p>
            <Link 
              href="/"
              className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-gradient-to-br from-[var(--app-background)] via-[var(--app-gray-light)] to-[var(--app-gray)]">
      <div className="w-full max-w-lg mx-auto px-6 py-12">
        <header className="text-center mb-12 animate-slide-in-up">
          <div className="mb-6">
            <BadgeIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-3 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
            My Badges
          </h1>
          <p className="text-lg text-[var(--app-foreground-muted)] max-w-md mx-auto leading-relaxed">
            Your collection of earned badges
          </p>
        </header>

        <main className="flex-1">
          {badges.length === 0 ? (
            <div className="glass-effect rounded-2xl shadow-xl border border-[var(--app-card-border)] p-8 text-center animate-fade-in-scale">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center">
                  <BadgeIcon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-2">
                  No Badges Yet
                </h3>
                <p className="text-[var(--app-foreground-muted)] mb-6 text-base">
                  You don&apos;t have any badges yet. Claim your first badge!
                </p>
              </div>
              <Link 
                href="/"
                className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-[var(--app-foreground-muted)] text-lg">
                  You have {badges.length} badge{badges.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {badges.map((badge, index) => (
                  <div 
                    key={index}
                    className="gradient-border p-6 animate-fade-in-scale hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-6">
                      <BadgeIcon className="w-20 h-20 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-2">
                          {badge.event}
                        </h3>
                        <p className="text-[var(--app-foreground-muted)] text-sm mb-2">
                          {new Date(badge.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-[var(--app-foreground-muted)] text-xs font-mono bg-[var(--app-gray)] px-3 py-1 rounded-full inline-block">
                          {badge.wallet.slice(0, 6)}...{badge.wallet.slice(-4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-[var(--app-card-border)]">
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] font-medium transition-colors text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <p className="text-[var(--app-foreground-muted)] text-sm mt-4">
              Built on Base with MiniKit
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
