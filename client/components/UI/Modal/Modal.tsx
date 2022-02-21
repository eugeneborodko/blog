import { FC, MouseEvent, ReactNode } from 'react'
import { Button } from '../index'

interface ModalProps {
  title: string
  buttonContent: string
  children?: ReactNode
  onSubmit: () => void
}

const Modal: FC<ModalProps> = ({ title, buttonContent, children, onSubmit }) => {
  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <Button onClick={onSubmit}>{buttonContent}</Button>
    </form>
  )
}

export default Modal
