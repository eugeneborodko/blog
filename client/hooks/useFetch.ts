import { useState } from 'react'
import { AxiosResponse } from 'axios'

const useFetch = <T>(request: () => Promise<AxiosResponse<T>>) => {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await request()
      setData(response.data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, fetchData]
}

export default useFetch
