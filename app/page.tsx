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
// import { useRouter } from "next/navigation";
// import Link from "next/link";
import BadgeIcon from "./components/BadgeIcon";

interface Badge {
  id: string;
  wallet: string;
  event: string;
  date: string;
  image: string;
}

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // const router = useRouter();
  const [qrScanning, setQrScanning] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [badges, setBadges] = useState<Badge[]>([]);
  const [showBadges, setShowBadges] = useState(false);

  const eventOptions = [
    "Python Workshop Day 1", 
    "WeThinkCode Bootcamp",
    "AWS Summit", 
    "Base Vibe Coding Hackathon", 
    "Geekulcha  Hackathon", 
    "AI Fundamentals",
    "Data Science Basics",
    "AI & Machine Learning",
    "AVI Jozi",
    "Web3 Security Workshop"
  ];
  
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Load badges on wallet connection
  useEffect(() => {
    if (address) {
      const savedBadges = localStorage.getItem(`badges_${address}`);
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      } else {
        setBadges([]);
      }
    }
  }, [address]);

  // Show toast for 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleJoinTrainingSession = () => {
    setShowQrModal(true);
    setSelectedEvent("");
    setQrScanning(false);
  };

  const handleEventSelect = (event: string) => {
    setSelectedEvent(event);
  };

  const handleQrScan = () => {
    if (!selectedEvent) {
      showToastMessage("Please select a training session first!");
      return;
    }

    setQrScanning(true);
    
    // Simulate QR scanning
    setTimeout(() => {
      const newBadge: Badge = {
        id: Date.now().toString(),
        wallet: address!,
        event: selectedEvent,
        date: new Date().toLocaleDateString(),
        image: "local-badge"
      };

      const updatedBadges = [...badges, newBadge];
      setBadges(updatedBadges);
      localStorage.setItem(`badges_${address}`, JSON.stringify(updatedBadges));
      
      setQrScanning(false);
      setShowQrModal(false);
      showToastMessage(`Badge earned for ${selectedEvent}!`);
    }, 2000);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setSelectedEvent("");
    setQrScanning(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-pink-100 to-gray-200 text-gray-900">
      <div className="w-full max-w-lg mx-auto px-6 py-12">
        {/* Toast for notifications */}
        {showToast && (
          <div role="alert" aria-live="assertive" className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500">
            {toastMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        {isConnected && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setShowBadges(false)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  !showBadges 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setShowBadges(true)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  showBadges 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                My Badges ({badges.length})
              </button>
            </div>
          </div>
        )}

        {!showBadges ? (
          // HOME TAB
          <>
            <header className="text-center mb-12 animate-slide-in-up">
              <div className="mb-6">
                <BadgeIcon className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg bg-pink-300 border-4 border-pink-500" />
              </div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-gray-600 to-pink-400 bg-clip-text text-transparent mb-2">
                Your Skills, Your Proof, Your Future
              </h1>
              <h2 className="text-lg text-gray-600 mb-4">
                Attend workshops → Scan QR → Earn blockchain certificates → Land opportunities
              </h2>
            </header>

            <main className="flex-1 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
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

                  <p className="text-gray-600 text-sm leading-relaxed">
                    Connect to start earning verified training certificates
                  </p>
                </div>
              </div>

              {/* ALWAYS SHOW JOIN TRAINING AFTER CONNECTION */}
              {isConnected && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Join Training Session
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="mb-6">
                        <BadgeIcon className="w-20 h-20 mx-auto mb-4" />
                        <p className="text-gray-600 text-base leading-relaxed">
                          Select a training session and scan the QR code to earn your certificate
                        </p>
                      </div>
                      
                      <button
                        onClick={handleJoinTrainingSession}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Join Training Session
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </>
        ) : (
          // MY BADGES TAB
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              My Training Certificates
            </h2>
            
            {badges.length === 0 ? (
              <div className="text-center py-8">
                <BadgeIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500">No certificates earned yet</p>
                <p className="text-sm text-gray-400 mt-2">Join training sessions to start earning!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={`${badge.id}-${index}`}
                    className="bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">🏆</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-800">{badge.event}</h3>
                        <p className="text-sm text-blue-600">Earned on {badge.date}</p>
                      </div>
                      <div className="text-blue-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* QR Scanner Modal */}
        {showQrModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full mx-4">
              <h3 className="text-xl font-bold text-center mb-6">Select Training Session</h3>
              
              <div className="space-y-3 mb-6">
                {eventOptions.map((event) => (
                  <button
                    key={event}
                    onClick={() => handleEventSelect(event)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedEvent === event
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>

              {selectedEvent && (
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-100 border-4 border-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {qrScanning ? (
                      <div className="animate-pulse">
                        <div className="text-blue-500">Scanning...</div>
                      </div>
                    ) : (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                      </svg>
                    )}
                  </div>
                  
                  <button
                    onClick={handleQrScan}
                    disabled={qrScanning}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-6 rounded-full transition-all duration-200"
                  >
                    {qrScanning ? 'Scanning...' : 'Scan QR Code'}
                  </button>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={closeQrModal}
                  className="text-gray-500 underline hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Built on Base with MiniKit
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Secure • Fast • Reliable
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}