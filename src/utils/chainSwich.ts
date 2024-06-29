import { ethers } from 'ethers'
import { AUTH_TOKEN_STORAGE_KET } from './constants'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export const useListenOnChainSwitch = async () => {
  const { openChainModal } = useChainModal()
  const { chain } = useAccount()
  if (!window.localStorage.getItem(AUTH_TOKEN_STORAGE_KET)) {
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const network = await provider.getNetwork()
  const chainId = chain?.id || 1
  if (chainId != 42161) {
    openChainModal?.()
  }
}
