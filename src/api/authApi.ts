import { AUTH_TOKEN_STORAGE_KET } from '@/utils/constants'
import { spellAxios } from './base'
import {
  LoginReq,
  LoginResFlag,
  LoginRsp,
  NonceRsp,
} from '@/interface/apiInterface/auth'
import { setLocalStorage } from '@/utils'

export const login = async (loginReq: LoginReq): Promise<LoginResFlag> => {
  try {
    const res = await spellAxios.post('/api/auth/Login', loginReq)
    const data: LoginRsp = res?.data
    if (data.token) {
      setLocalStorage(AUTH_TOKEN_STORAGE_KET, data.token)
    }

    return data.res_flag
  } catch (error) {
    return -1
  }
}

export const getNonce = async (): Promise<string> => {
  try {
    const res = await spellAxios.post('/api/auth/Nonce')
    const data: NonceRsp = res?.data
    return data.nonce
  } catch (error) {
    return ''
  }
}
