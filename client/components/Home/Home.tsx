import { useRouter } from 'next/router'
import { useState } from 'react'
import AuthService from '../../services/AuthService'
import { host } from '../../http'
import { AuthResponse } from '../../models/response/AuthResponse'
import { FC, useContext, useEffect } from 'react'
import { AppContext, ContextProps } from '../../context'
import { Button } from '../UI'
import { IUser } from '../../models/IUser'
import UserService from '../../services/UserService'
import useFetch from '../../hooks/useFetch'

const Home: FC = () => {
  const [users, loading, myError, fetchData] = useFetch<IUser[]>(UserService.getAll)
  console.log('users: ', users)
  const { isAuth, setIsAuth, isReg, setUser } = useContext(
    AppContext
  ) as ContextProps

  // const [users, setUsers] = useState<IUser[]>([])
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

  // const getUsers = () => {
  //   // const response = await UserService.getAll()
  //   // setUsers(response.data)
  //   // fetchData().then(res => console.log('res: ###: ', res))
  // }

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
      if (err instanceof Error) {
        console.log(err.response?.data?.message)
      }
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
      {isReg && !isAuth && (
        <>
          <Button onClick={onLogIn}>Log in</Button>
        </>
      )}
      {isAuth && (
        <>
          <div>You logged in</div>
          <Button onClick={fetchData}>Get users list</Button>
          {/* <button onClick={fetchData}>a</button> */}
          <Button onClick={onLogOut}>Log out</Button>
          {loading && (
            <h1>loading...</h1>
          )}
          {myError && (
            <h1>{myError}</h1>
          )}
          {!!users.length && (
            <div>
              {users.map(({ id, email }: IUser) => (
                <div key={id}>
                  {id}: {email}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {!isReg && !isAuth && (
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
