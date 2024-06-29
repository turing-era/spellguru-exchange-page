import { getUserInfo } from '@/api/userApi'
import { UserInfo } from '@/interface/apiInterface/userinfo'
import { getLocalStorage } from '@/utils'
import { AUTH_TOKEN_STORAGE_KET } from '@/utils/constants'
import { createContext, useContext, useEffect, useState } from 'react'

type UserInfoProviderType = {
  hasToken: boolean
  userInfo: UserInfo | undefined
  loginWithUserInfo: boolean
  updateUserInfo: () => void
}

const UserInfoContext = createContext<UserInfoProviderType>({
  hasToken: false,
  userInfo: undefined,
  loginWithUserInfo: false,
  updateUserInfo: () => {},
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
  const updateUserInfo = async () => {
    try {
      const res = await getUserInfo()
      setUserInfo(res)
    } catch (e) {
      console.log('Login error', e)
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

  return (
    <UserInfoContext.Provider
      value={{ hasToken, userInfo, loginWithUserInfo, updateUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}
