import { createContext } from 'react'

export interface ContextProps {
  isAuth: boolean
  setIsAuth: (bool: boolean) => void
}

export const AppContext = createContext<ContextProps | null>(null)
