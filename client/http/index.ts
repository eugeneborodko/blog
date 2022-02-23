import axios, { AxiosRequestConfig } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const host = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

authHost.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    return config
  }
)

authHost.interceptors.response.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config
  },
  async (err) => {
    const originalRequest = err.config
    const isRetry =
      err.response.status === 401 && err.config && !err.config._isRetry
    if (isRetry) {
      originalRequest._isRetry = true
    }

    try {
      const response = await host.get<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.accessToken)
      return authHost.request(originalRequest)
    } catch (err) {
      console.log(err)
    }
  }
)
