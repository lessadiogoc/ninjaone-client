import cx from 'classnames'
import Bullets from '../../assets/bullets.svg?react'

import { Button } from '../Button/Button'
import { useDropdown } from '../../hooks/use-dropdown'

interface Props {
  children?: React.ReactNode
}

export const Menu = ({ children }: Props) => {
  const { id, open, toggle } = useDropdown()

  return (
    <div className="relative" data-cy="menu">
      <Button variant="flat" onClick={toggle} id={id}>
        <Bullets />
      </Button>
      {open && (
        <ul className="absolute right-0 z-10 bg-white shadow py-1 border border-gray-200 rounded-sm">{children}</ul>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger'
}

export const MenuItem = ({ children, variant, onClick }: MenuItemProps) => {
  return (
    <li
      data-cy="menu-item"
      className={cx('relative', 'hover:bg-gray-100', 'cursor-pointer', 'list-none', 'px-4', 'py-1.5', 'min-w-[120px]', {
        'text-red-500': variant === 'danger',
      })}
      onClick={onClick}
    >
      {children}
    </li>
  )
}
