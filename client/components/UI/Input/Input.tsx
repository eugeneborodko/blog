import { FC, ComponentPropsWithoutRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

const Input: FC<InputProps> = ({ ...props }) => {
  return <input {...props} />
}

export default Input
