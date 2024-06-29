'use client'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { logOnDev, removeLocalStorage } from '../utils'
import { AUTH_TOKEN_STORAGE_KET } from '../utils/constants'
import { logout } from '@/utils/auth'

export const spellAxios = axios.create({
  timeout: 60000,
  responseType: 'json',
})

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KET)
  config.headers['Authorization'] = `Bearer ${token}`
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)
  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config
  const { status, data } = response
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(
    `🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status} | data ${data}`
  )

  return response
}

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error
    const { method, url } = error.config as AxiosRequestConfig
    const { statusText, status } = (error.response as AxiosResponse) ?? {}

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    )

    switch (status) {
      case 401: {
        // "Login required"
        break
      }
      case 403: {
        // "Permission denied"
        break
      }
      case 404: {
        // "Invalid request"
        break
      }
      case 500: {
        // "Server error"
        break
      }
      default: {
        // "Unknown error occurred"
        break
      }
    }

    if (status === 401) {
      logout()
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`)
  }

  return Promise.reject(error)
}
spellAxios.interceptors.request.use(onRequest, onErrorResponse)
spellAxios.interceptors.response.use(onResponse, onErrorResponse)
