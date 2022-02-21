import type { AppProps } from 'next/app'
import { useState } from 'react'
import { AppContext } from '../context'
import { IUser } from '../models/IUser'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>({} as IUser)

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
