import { getLocalStorage, removeLocalStorage } from '.'
import { AUTH_TOKEN_STORAGE_KET } from './constants'

export const checkAuthExist = (): boolean => {
  const token = getLocalStorage(AUTH_TOKEN_STORAGE_KET)
  if (!token) {
    return false
  }
  return true
}

export const logout = (): void => {
  removeLocalStorage(AUTH_TOKEN_STORAGE_KET)
  window.location.reload()
}
