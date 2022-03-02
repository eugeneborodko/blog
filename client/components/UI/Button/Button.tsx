import { FC, ReactNode, ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default Button
