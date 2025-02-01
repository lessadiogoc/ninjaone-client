import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label?: string
  style?: React.CSSProperties
}

export const Input = ({ icon = null, type = 'text', label, style, ...rest }: InputProps) => {
  return (
    <>
      {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
      <div
        className="flex items-center gap-1 p-2"
        style={{ border: '1px solid #ccc', height: 38, borderRadius: '4px', ...style }}
      >
        {icon}
        <input
          {...rest}
          type={type}
          style={{
            width: '100%',
          }}
        />
      </div>
    </>
  )
}
