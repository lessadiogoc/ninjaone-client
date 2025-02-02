import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { label: string; value: string }[]
  style?: React.CSSProperties
}

export const Select = ({ label, style, options, ...rest }: SelectProps) => {
  return (
    <>
      {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
      <div
        className="flex items-center gap-1 p-2 border-1 border-gray-300"
        style={{ height: 38, borderRadius: '4px', ...style }}
      >
        <select
          {...rest}
          style={{
            width: '100%',
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
