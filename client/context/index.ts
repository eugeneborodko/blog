import { createContext } from 'react'
import { IUser } from '../models/IUser'

export interface ContextProps {
  isAuth: boolean
  isReg: boolean
  setIsAuth: (bool: boolean) => void
  setIsReg: (bool: boolean) => void
  user: IUser
  setUser: (user: IUser) => void
}

export const AppContext = createContext<ContextProps | null>(null)
