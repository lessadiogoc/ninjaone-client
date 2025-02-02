import React, { useState } from 'react'
import cx from 'classnames'

import Chevron from '../../assets/arrow-down.svg?react'
import { useDropdown } from '../../hooks/use-dropdown'

interface Props {
  label?: string
  options: { label: string; value: string }[]
  style?: React.CSSProperties
  prefix?: string
  onChange?: (value: string) => void
  name: string
  value?: string
  required?: boolean
}

export const Select = ({ label, style, options, value, name, prefix, onChange, required }: Props) => {
  const { id, open, toggle } = useDropdown()
  const [selectedValue, setSelectedValue] = useState(value)

  const handleClick = (value: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle()
    setSelectedValue(value)
    onChange?.(value)
  }

  return (
    <>
      {label ? <label className="block mb-1">{label}</label> : null}
      <div
        className="relative cursor-pointer flex items-center justify-between gap-2 p-2 border-1 border-gray-300 rounded-sm "
        style={{ height: 38, ...style }}
        id={id}
        onClick={toggle}
      >
        <span>
          {prefix} {options.find((option) => option.value === selectedValue)?.label}
        </span>

        {open && (
          <ul className="absolute left-0 right-0 top-[calc(100%+1px)] z-10 bg-white shadow py-1 border border-gray-200 rounded-sm">
            {options.map((option) => (
              <li
                key={option.value}
                className={cx('relative', 'hover:bg-gray-100', 'cursor-pointer', 'list-none', 'px-4', 'py-1.5')}
                onClick={handleClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        <span className={cx('origin-center', { 'rotate-180': open })}>
          <Chevron />
        </span>

        <input name={name} value={selectedValue} className="hidden" required={required} readOnly />
      </div>
    </>
  )
}
