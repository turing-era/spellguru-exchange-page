'use client'

import * as React from 'react'
import {
  RainbowKitProvider,
  darkTheme,
  RainbowKitAuthenticationProvider,
  getDefaultConfig,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { arbitrum } from 'wagmi/chains'
import { authenticationAdapter } from '@/utils/walletAuth'
import { useUserInfoContext } from '@/providers/userInfoProvider'
import { Colors } from '@/utils/constants'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  okxWallet,
  tokenPocketWallet,
  gateWallet,
} from '@rainbow-me/rainbowkit/wallets'
const initialChain = arbitrum
// process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? sepolia : arbitrum

const projectId = '91465c23db5e225d16bc878d2844f992'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        okxWallet,
        tokenPocketWallet,
        gateWallet,
      ],
    },
  ],
  {
    appName: 'SpellGuru',
    projectId: projectId,
  }
)

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId,
  chains: [arbitrum],
  //@ts-ignore
  connectors,
  ssr: true, // If your dApp uses server side rendering (SSR)
})

export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const { loginWithUserInfo } = useUserInfoContext()
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={loginWithUserInfo ? 'authenticated' : 'unauthenticated'}
        >
          <RainbowKitProvider
            showRecentTransactions={true}
            locale="en"
            initialChain={initialChain}
            theme={darkTheme({
              accentColor: Colors.primary.main,
              accentColorForeground: 'black',
              borderRadius: 'large',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            {mounted && children}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
