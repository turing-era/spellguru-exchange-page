import { getUserInfo, previewReward } from '@/api/userApi'
import { PreviewSpellguruRewardRsp } from '@/interface/apiInterface/exchange'
import { UserInfo } from '@/interface/apiInterface/userinfo'
import { getLocalStorage } from '@/utils'
import { AUTH_TOKEN_STORAGE_KET } from '@/utils/constants'
import { createContext, useContext, useEffect, useState } from 'react'

type UserInfoProviderType = {
  hasToken: boolean
  userInfo: UserInfo | undefined
  loginWithUserInfo: boolean
  rewardInfo: PreviewSpellguruRewardRsp
  updateUserInfo: () => void
  updateRewardInfo: () => void
}

const defaultRewardInfo: PreviewSpellguruRewardRsp = {
  spellguru_address: '',
  gai: 0,
  pk_times: 0,
  phrases_slot_total: 0,
  experience_slot_total: 0,
  exchanged_experience_slot: 0,
  exchanged_gai_amount: 0,
  exchanged_phrases_slot: 0,
  exchanged_experience_slot_ts: 0,
  exchanged_gai_ts: 0,
  exchanged_phrases_slot_ts: 0,
  exchanged_pk_times: 0,
  exchanged_pk_ts: 0,
  exchanged_saix: 0,
  exchanged_spell_slot: 0,
  exchanged_vsgai: 0,
}

const UserInfoContext = createContext<UserInfoProviderType>({
  hasToken: false,
  userInfo: undefined,
  loginWithUserInfo: false,
  rewardInfo: defaultRewardInfo,
  updateUserInfo: () => {},
  updateRewardInfo: () => {},
})

export const useUserInfoContext = () => useContext(UserInfoContext)

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [hasToken, setHasToken] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [loginWithUserInfo, setLoginWithUserInfo] = useState(false)
  const [rewardInfo, setRewardInfo] = useState<PreviewSpellguruRewardRsp>(defaultRewardInfo)

  const updateUserInfo = async () => {
    try {
      const res = await getUserInfo()
      setUserInfo(res)
    } catch (e) {
      console.log('Login error', e)
    }
  }

  const updateRewardInfo = async () => {
    try {
      const res = await previewReward()
      console.log('setRewardInfo', res)
      res && setRewardInfo(res)
    } catch (e) {
      console.log('previewReward error', e)
    }
  }

  const listenOnStorage = () => {
    const token = getLocalStorage(AUTH_TOKEN_STORAGE_KET)
    if (token) {
      setHasToken(true)
    } else {
      setHasToken(false)
    }
  }

  const hasWindowObj = typeof window !== 'undefined'

  useEffect(() => {
    if (hasWindowObj) {
      listenOnStorage()
    }
  }, [hasWindowObj])

  useEffect(() => {
    window.addEventListener('storage', listenOnStorage)
    return () => {
      window.removeEventListener('storage', listenOnStorage)
    }
  }, [])

  useEffect(() => {
    if (hasToken) {
      updateUserInfo()
    } else {
      setUserInfo(undefined)
    }
  }, [hasToken])

  useEffect(() => {
    setLoginWithUserInfo(hasToken && !!userInfo)
  }, [hasToken, userInfo])

  useEffect(() => {
    if (userInfo) {
      updateRewardInfo()
    } else {
      setRewardInfo(defaultRewardInfo)
    }
  }, [userInfo])

  return (
    <UserInfoContext.Provider
      value={{ hasToken, userInfo, rewardInfo, loginWithUserInfo, updateUserInfo, updateRewardInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}
