"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--app-foreground)] mb-2">
              My Badges
            </h1>
            <p className="text-[var(--app-foreground-muted)]">
              Connect your wallet to view your badges
            </p>
          </header>

          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6 text-center">
            <p className="text-[var(--app-foreground-muted)] mb-4">
              Please connect your wallet to view your badges
            </p>
            <Link 
              href="/"
              className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--app-foreground)] mb-2">
            My Badges
          </h1>
          <p className="text-[var(--app-foreground-muted)]">
            Your collection of earned badges
          </p>
        </header>

        <main className="flex-1">
          {badges.length === 0 ? (
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6 text-center">
              <p className="text-[var(--app-foreground-muted)] mb-4">
                You don&apos;t have any badges yet. Claim your first badge!
              </p>
              <Link 
                href="/"
                className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6"
                >
                  <div className="flex items-center space-x-4">
                    <Image 
                      src={badge.image} 
                      alt={badge.event}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--app-foreground)]">
                        {badge.event}
                      </h3>
                      <p className="text-[var(--app-foreground-muted)] text-sm">
                        {new Date(badge.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-[var(--app-foreground-muted)] text-xs font-mono">
                        {badge.wallet.slice(0, 6)}...{badge.wallet.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <Link 
            href="/"
            className="text-[var(--ock-text-foreground-muted)] text-xs hover:text-[var(--app-accent)] transition-colors"
          >
            ← Back to Home
          </Link>
        </footer>
      </div>
    </div>
  );
}
