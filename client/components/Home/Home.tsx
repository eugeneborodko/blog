import { useRouter } from 'next/router'
import { FC, useContext } from 'react'
import { AppContext, ContextProps } from '../../context'
import { Button } from '../UI'

const Home: FC = () => {
  const { isAuth } = useContext(AppContext) as ContextProps
  const router = useRouter()

  const handleLogIn = () => {
    router.push('/login')
  }

  const handleLogOut = () => {
    console.log('logout')
  }

  return (
    <>
      <h1>Home page</h1>
      {isAuth ? (
        <>
          <div>You logged in</div>
          <Button onClick={handleLogOut}>Log out</Button>
        </>
      ) : (
        <>
          <div>Please, log in</div>
          <Button onClick={handleLogIn}>Log in</Button>
        </>
      )}
    </>
  )
}

export default Home
