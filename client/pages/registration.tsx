import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useState } from 'react'
import { Modal, Input } from '../components/UI'
import AuthService from '../services/AuthService'
import { AppContext, ContextProps } from '../context'

const Login: NextPage = () => {
  const { setIsAuth, setUser } = useContext(AppContext) as ContextProps

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const registration = async () => {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      setIsAuth(true)
      setUser(response.data.user)
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.response?.data.message)
      }
    }
  }

  return (
    <Modal title="Sign up" buttonContent="Sign up" onSubmit={registration}>
      {error && <h1>{error}</h1>}
      <Input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={onEmailChange}
      />
      <Input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onPasswordChange}
      />
    </Modal>
  )
}

export default Login
