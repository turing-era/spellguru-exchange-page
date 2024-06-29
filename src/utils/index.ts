// For Make Log on Develop Mode
import { format } from 'date-fns'
export const logOnDev = (event: any, message?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(event, message)
  }
}

export const setLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    logOnDev('setLocalStorageError', e)
  }
}

export const getLocalStorage = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    logOnDev('getLocalStorageError', e)
    return undefined
  }
}

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key)
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    logOnDev('getLocalStorageError', e)
  }
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export const dateFormat = (timestamp: number) => {
  // Convert timestamp to milliseconds
  let date = new Date(timestamp * 1000)

  // Format the date and time using date-fns
  let formattedTime = format(date, 'yyyy/MM/dd HH:mm:ss')

  return formattedTime
}
