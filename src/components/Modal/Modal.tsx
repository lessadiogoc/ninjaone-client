import CloseIcon from '../../assets/close.svg?react'
import { Button } from '../Button/Button'
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
    <div className="modal-overlay">
      <div className="bg-white rounded-sm p-6 mx-6 max-w-[540px] w-full md:w-[540px]">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-2xl font-medium">{title}</h4>
          <Button variant="flat" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
