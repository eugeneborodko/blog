import { useRouter } from 'next/router'
import { useState } from 'react'
import AuthService from '../../services/AuthService'
import { host } from '../../http'
import { AuthResponse } from '../../models/response/AuthResponse'
import { FC, useContext, useEffect } from 'react'
import { AppContext, ContextProps } from '../../context'
import { Button } from '../UI'
import { IUser } from '../../models/IUser'

const Home: FC = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AppContext) as ContextProps

  const [error, setError] = useState<string>('')

  const router = useRouter()

  const onLogIn = () => {
    router.push('/login')
  }

  const onLogOut = async () => {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      setIsAuth(false)
      setUser({} as IUser)
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.response?.data.message)
      }
    }
  }

  const onSignUp = () => {
    router.push('/registration')
  }

  const checkAuth = async () => {
    try {
      const response = await host.get<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {
          withCredentials: true,
        }
      )
      localStorage.setItem('token', response.data.accessToken)
      setIsAuth(true)
      setUser(response.data.user)
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
    }
  }, [])

  return (
    <>
      <h1>Home page</h1>
      {error && <h1>{error}</h1>}
      {isAuth ? (
        <>
          <div>You logged in</div>
          <Button onClick={onLogOut}>Log out</Button>
        </>
      ) : (
        <>
          <div>Please, log in or sign up</div>
          <Button onClick={onLogIn}>Log in</Button>
          <Button onClick={onSignUp}>Sign Up</Button>
        </>
      )}
    </>
  )
}

export default Home
