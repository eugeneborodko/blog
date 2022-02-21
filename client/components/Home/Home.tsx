import { useRouter } from 'next/router'
import { authHost, host } from '../../http'
import { AuthResponse } from '../../models/response/AuthResponse'
import { FC, useContext, useEffect } from 'react'
import { AppContext, ContextProps } from '../../context'
import { Button } from '../UI'

const Home: FC = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AppContext) as ContextProps

  const router = useRouter()

  const onLogIn = () => {
    router.push('/login')
  }

  const onLogOut = () => {
    console.log('logout')
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

  console.log('isAuth: ', isAuth)

  return (
    <>
      <h1>Home page</h1>
      {isAuth ? (
        <>
          <div>You logged in</div>
          <Button onClick={onLogOut}>Log out</Button>
        </>
      ) : (
        <>
          <div>Please, log in</div>
          <Button onClick={onLogIn}>Log in</Button>
        </>
      )}
    </>
  )
}

export default Home
