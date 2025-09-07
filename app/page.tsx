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
import { useRouter } from "next/navigation";
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
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const [organiserPhrase, setOrganiserPhrase] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Show toast for 2 seconds when badge is claimed
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (address) {
      const savedBadges = localStorage.getItem(`badges_${address}`);
      if (savedBadges) {
        const badges = JSON.parse(savedBadges);
        setBadgeClaimed(badges.length > 0);
      }
    }
  }, [address]);

  useEffect(() => {
    if (isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

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
    const hasExistingBadge = badges.some((badge: Badge) => badge.event === newBadge.event && badge.wallet === address);
    if (!hasExistingBadge) {
      badges.push(newBadge);
      localStorage.setItem(`badges_${address}`, JSON.stringify(badges));
      setBadgeClaimed(true);
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-blue-100 to-gray-300 text-gray-900 dark:text-white">
      <div className="w-full max-w-lg mx-auto px-6 py-12">
        {/* Toast for badge claim success */}
        {showToast && (
          <div role="alert" aria-live="assertive" className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500">
            Badge claimed successfully!
          </div>
        )}
        <header className="text-center mb-12 animate-slide-in-up">
          <div className="mb-6">
            <BadgeIcon className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg bg-pink-300 border-4 border-pink-500" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-400 to-gray-400 bg-clip-text text-transparent mb-2 animate-gradient">Your Skills, Your Proof, Your Future</h1>
          <h2 className="text-xl text-blue-500 mb-4">Attend workshops, hackathons, and events → Scan QR → Earn blockchain certificates → Land opportunities</h2>
          <div className="flex justify-center items-center gap-6 mt-6">
            <div className="flex flex-col items-center">
              {/* <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 font-semibold">Workshop</span>
              <span className="mt-2 text-gray-400 text-xs">Attend</span>
            </div>
            <span className="text-2xl text-blue-400">&#8594;</span>
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 font-semibold">QR Scan</span>
              <span className="mt-2 text-gray-400 text-xs">Scan</span>
            </div>
            <span className="text-2xl text-blue-400">&#8594;</span>
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 font-semibold">Certificate</span>
              <span className="mt-2 text-gray-400 text-xs">Earn</span>
            </div>
            <span className="text-2xl text-blue-400">&#8594;</span>
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 font-semibold">Opportunity</span>
              <span className="mt-2 text-gray-400 text-xs">Land</span> */}
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-8">
          <div className="glass-effect rounded-2xl shadow-xl border border-[var(--app-card-border)] p-8 animate-fade-in-scale">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
                Connect Your Wallet
              </h2>
              
              <div className="flex justify-center mb-8">
                <Wallet className="z-10">
                  <ConnectWallet />
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
                Secure connection to claim your exclusive  badge
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
                      className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]">
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
                      className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] hover:from-[var(--app-accent-hover)] hover:to-[var(--app-accent-active)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]">
                      Claim Badge
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isConnected && !badgeClaimed && (
            <div className="gradient-border p-8 animate-slide-in-up">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
                  Claim Your Badge
                </h2>
                <div className="space-y-6">
                  <div className="mb-6">
                    <BadgeIcon className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-[var(--app-foreground-muted)] text-base leading-relaxed">
                      To claim your badge, please either mock scan the QR code below or enter the phrase provided by the event organiser.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200"
                      onClick={() => setShowQrModal(true)}>
                      Mock Scan QR Code
                    </button>
                    <input
                      type="text"
                      placeholder="Enter organiser phrase"
                      className="border border-blue-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={organiserPhrase}
                      onChange={e => setOrganiserPhrase(e.target.value)}
                    />
                    <button
                      className="bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                      onClick={handleClaimBadge}
                      disabled={!organiserPhrase && !qrScanned}
                    >
                      Claim Badge
                    </button>
                  </div>
                  {/* QR Modal */}
                  {showQrModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
                        <span className="text-lg font-semibold mb-4">Mock QR Scanner</span>
                        <div className="w-32 h-32 bg-gray-100 border-4 border-blue-400 rounded-lg flex items-center justify-center animate-pulse mb-4">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                            <circle cx="8" cy="8" r="1.5" fill="#3b82f6"/>
                            <circle cx="16.5" cy="16.5" r="1.5" fill="#3b82f6"/>
                          </svg>
                        </div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200"
                          onClick={() => { setQrScanned(true); setShowQrModal(false); }}>
                          Simulate Scan
                        </button>
                        <button
                          className="mt-4 text-blue-500 underline"
                          onClick={() => setShowQrModal(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isConnected && !badgeClaimed && (
            <div className="text-center animate-fade-in-scale">
              <Link 
                href="/badges"
                className="inline-flex items-center gap-2 text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] font-medium transition-colors text-base focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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