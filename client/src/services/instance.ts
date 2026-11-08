import { getErrorMessage } from '@/lib/errors.ts'
import axios, { type AxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(getErrorMessage(error)))
    }

    return Promise.reject(error)
  },
)

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance({ ...config, ...options })
  return response.data satisfies T
}
