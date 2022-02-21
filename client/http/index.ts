import axios, { AxiosRequestConfig } from 'axios'

export const host = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

authHost.interceptors.request.use((config: AxiosRequestConfig) : AxiosRequestConfig => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  return config
})