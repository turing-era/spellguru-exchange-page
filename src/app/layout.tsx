'use client'
import { Poppins } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'
import { Web3Providers } from '@/providers/web3Providers'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/Loading'
import { UserInfoProvider } from '@/providers/userInfoProvider'
import { Analytics } from '@vercel/analytics/react'
import localFont from 'next/font/local';
import MuiThemeProvider from '@/providers/themeProvider';
import useMediaQuery from '@mui/material/useMediaQuery';

const chirp = localFont({
  src: [
    {
      path: '../../public/fonts/ChirpRegular.ttf',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../../public/fonts/ChirpBold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClientSide, setIsClientSide] = useState(false)
  const hasWindowObj = typeof window !== 'undefined'

  useEffect(() => {
    if (hasWindowObj) {
      setIsClientSide(true)
    } else {
      setIsClientSide(false)
    }
  }, [hasWindowObj])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={chirp.className} style={{overflowY: 'scroll'}}>
        <div
          style={{
            position: 'static',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            backgroundSize: '100% 100vh',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('/bg_2.webp')`,
            overflowY: 'scroll',
          }}
        >
          <MuiThemeProvider>
            <UserInfoProvider>
              <Web3Providers>{children}</Web3Providers>
            </UserInfoProvider>
          </MuiThemeProvider>
        </div>
        <Analytics></Analytics>
      </body>
    </html>
  )
}
