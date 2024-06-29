import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { getNonce, login } from '@/api/authApi'
import { LoginResFlag } from '@/interface/apiInterface/auth'
import { logout } from './auth'
export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const nonce = await getNonce()
    return nonce
  },
  createMessage: ({ nonce, address, chainId }) => {
    const message = {
      domain: window.location.host,
      address,
      statement: 'SpellGuru wants you to sign in with your Ethereum account:',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    }
    return new SiweMessage(message)
  },
  getMessageBody: ({ message }) => {
    return message.prepareMessage()
  },
  verify: async ({ message, signature }) => {
    let invited_code = ''
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      invited_code = urlParams.get('refer_code') || ''
    }
    const loginRes = await login({
      signature: signature,
      message: message.prepareMessage(),
      login_type: 3,
      access_token: '',
      refer_code: invited_code,
      secret: '',
    })
    return Boolean(loginRes === LoginResFlag.LOGIN_SUCC)
  },
  signOut: async () => {
    logout()
    return
  },
})
