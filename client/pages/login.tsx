import type { NextPage } from 'next'
import { Modal, Input } from '../components/UI'

const Login: NextPage = () => {
  const handleSubmit = () => {
    console.log('log in')
  }

  return (
    <Modal title="Log in" buttonContent="Log in" onSubmit={handleSubmit}>
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />
    </Modal>
  )
}

export default Login