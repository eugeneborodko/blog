import type { NextPage } from 'next'
import { useContext } from 'react'
import { AppContext, ContextProps } from '../context'
import { Button } from '../components/UI'

const HomePage: NextPage = () => {
  const { isAuth } = useContext(AppContext) as ContextProps

  return (
    <>
      <h1>Home page</h1>
      {isAuth ? (
        <>
          <div>You logged in</div>
          <Button>Log out</Button>
        </>
      ) : (
        <>
          <div>Please, log in</div>
          <Button>Log in</Button>
        </>
      )}
    </>
  )
}

export default HomePage
