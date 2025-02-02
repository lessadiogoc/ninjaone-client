import React from 'react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  icon?: React.ReactNode
  label?: string
  style?: React.CSSProperties
  onChange?: (value: string) => void
}

export const Input = ({ icon = null, type = 'text', label, style, onChange, ...rest }: InputProps) => {
  return (
    <>
      {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
      <div className="flex items-center gap-1 p-2 rounded-sm border-1 border-gray-300" style={{ height: 38, ...style }}>
        {icon}
        <input
          {...rest}
          type={type}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            width: '100%',
          }}
        />
      </div>
    </>
  )
}
