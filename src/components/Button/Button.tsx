import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import './button.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  icon?: React.ReactNode
  variant: 'primary' | 'secondary' | 'danger' | 'flat'
}

export const Button = ({ children, icon, variant = 'primary', ...rest }: Props) => {
  return (
    <button {...rest} className={cx('button', `button--${variant}`)}>
      {icon}
      {children}
    </button>
  )
}
