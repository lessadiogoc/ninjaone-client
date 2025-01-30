import { useState } from 'react'
import closeIcon from '../../assets/close.svg'
import './modal.css'

type Props = {
  children: React.ReactNode
  title: string
  open: boolean
  onClose: () => void
}

export const Modal = ({ open, title, onClose, children }: Props) => {
  if (!open) {
    return null
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h4>{title}</h4>
            <button onClick={onClose}>
              <img src={closeIcon} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
