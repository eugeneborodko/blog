import type { AppProps } from 'next/app'
import { useState } from 'react'
import { AppContext } from '../context'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  
  return (
    <AppContext.Provider value={{isAuth, setIsAuth}}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
