# Base MiniApp - Wallet Connection Demo

A minimal Next.js + React app with TailwindCSS that uses the Base MiniApp Kit for wallet connection functionality.

## Features

- ✅ Wallet connection with wagmi/viem
- ✅ "Connect Wallet" button on the home page
- ✅ Display user's wallet address after connecting
- ✅ Badge claiming system with localStorage
- ✅ "My Badges" page to view earned badges
- ✅ Clean, minimal UI with TailwindCSS
- ✅ Built with Base MiniApp Kit

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A Base-compatible wallet (Coinbase Wallet, MetaMask, etc.)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/lia/onchaincredz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Base MiniApp
   NEXT_PUBLIC_ICON_URL=/icon.png
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_APP_HERO_IMAGE=/hero.png
   NEXT_PUBLIC_SPLASH_IMAGE=/splash.png
   NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#0052FF
   ```

   **Note:** You can get a free OnchainKit API key from [onchainkit.xyz](https://onchainkit.xyz)

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Connect your wallet:**
   - Click the "Connect Wallet" button
   - Select your preferred wallet (Coinbase Wallet, MetaMask, etc.)
   - Approve the connection
   - Your wallet address will be displayed

4. **Claim and view badges:**
   - After connecting, click "Claim Badge" to earn your first badge
   - View all your badges on the "My Badges" page
   - Badges are stored locally in your browser

## Project Structure

```
├── app/
│   ├── components/
│   │   └── DemoComponents.tsx    # (cleared - not used)
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main app page with wallet connection
│   ├── providers.tsx             # MiniKit provider configuration
│   └── globals.css               # Global styles
├── lib/                          # Utility functions
├── public/                       # Static assets
├── package.json                  # Dependencies
└── tailwind.config.ts           # TailwindCSS configuration
```

## Key Dependencies

- **Next.js 15.3.3** - React framework
- **@coinbase/onchainkit** - Base MiniApp Kit for wallet integration
- **wagmi 2.16.0** - React hooks for Ethereum
- **viem 2.27.2** - TypeScript interface for Ethereum
- **TailwindCSS 3.4.1** - Utility-first CSS framework

## How It Works

1. **MiniKit Provider**: The app is wrapped with `MiniKitProvider` which provides wallet connection functionality
2. **Wallet Components**: Uses OnchainKit's `ConnectWallet`, `Wallet`, and `WalletDropdown` components
3. **Identity Display**: Shows user's avatar, name, address, and ETH balance after connection
4. **Responsive Design**: Built with TailwindCSS for mobile-first responsive design

## Troubleshooting

- **Wallet not connecting**: Ensure you have a Base-compatible wallet installed
- **API key issues**: Make sure your OnchainKit API key is correctly set in `.env.local`
- **Build errors**: Run `npm install` to ensure all dependencies are installed

## Next Steps

This is a minimal implementation. You can extend it by adding:
- Transaction functionality
- Badge logic
- Additional wallet features
- Custom UI components

## Built With

- [Next.js](https://nextjs.org/)
- [Base MiniApp Kit](https://onchainkit.xyz/)
- [TailwindCSS](https://tailwindcss.com/)
- [wagmi](https://wagmi.sh/)
- [viem](https://viem.sh/)