import { FC, MouseEvent, ReactNode } from 'react'
import { Button } from '../index'

interface ModalProps {
  title: string
  buttonContent: string
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({ title, buttonContent, children }) => {
  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <Button>{buttonContent}</Button>
    </form>
  )
}

export default Modal
