import { ethers } from 'ethers'
import contractABI from '../contracts/abi/SGBox721A_sol_SGBox721A.json'
import { cancelSignature, getSignature } from '@/api/sgboxApi'
import { SignType } from '@/interface/apiInterface/sgbox'
import { useState } from 'react'
import { useUserInfoContext } from '@/providers/userInfoProvider'
import {
  useAccountModal,
  useAddRecentTransaction,
  useChainModal,
} from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export const usePurchase = () => {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { updateUserInfo, userInfo } = useUserInfoContext()
  const addRecentTransaction = useAddRecentTransaction()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  const { chain } = useAccount()
  const purchase = async ({
    singType,
    boxId,
  }: {
    singType: SignType
    boxId?: string | number
  }) => {
    const availableSgBoxes = Math.min(
      userInfo?.dynamic?.sgbox_available || 0,
      userInfo?.dynamic?.sgkey_available || 0
    )
    const quantity = singType == SignType.SIGN_TYPE_ALL ? availableSgBoxes : 1
    if (!window.ethereum) {
      return
    }

    let boxids: any[] = []
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const chainId = chain?.id || 1
      if (chainId != 42161) {
        openChainModal?.()
        return
      }
      const signer = await provider.getSigner()
      const contractAddress = '0x010F58b7a3F95409FE48365C75F8bA2CaE4aC104'
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setLoading(true)

      const sigData = await getSignature(singType, boxId)
      boxids = sigData.boxids
      const address = await signer.getAddress()
      const quantity = sigData.quantity
      const purchaseLimit = sigData.purchase_limit
      const to = address
      const expireTimestamp = sigData.expire_timestamp
      const signature = sigData.signature
      updateUserInfo()
      const tx = await contract.purchase(
        quantity,
        purchaseLimit,
        to,
        expireTimestamp,
        signature,
        {
          value: ethers.parseUnits(`${sigData.amount}`, 'wei'),
          gasLimit: 800000,
        }
      )

      const desc =
        quantity == 1
          ? 'Open one SpellBox, check your rewards on the box list once the transaction is confirmed.'
          : `Open ${quantity} SpellBoxes, check your rewards on the box list once the transaction is confirmed.`

      // Get the transaction hash
      const txHash = tx.hash
      addRecentTransaction({
        hash: txHash,
        description: desc,
      })

      setLoading(false)
      openAccountModal?.()
      await updateUserInfo()
      setDone(true)
      return true
    } catch (e) {
      setLoading(false)
      await cancelSignature({ boxids })
      updateUserInfo()
      return false
    }
  }

  return { purchase, loading, done, setDone }
}
