import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'
import { Device } from '../types'
import { deleteDevice } from '../data/delete-device'

interface Props {
  onDeleteCallback?: () => void
  onClose: () => void
  device?: Device
}

export const DeleteDeviceModal = ({ device, onClose, onDeleteCallback }: Props) => {
  if (!device) {
    return null
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()

    await deleteDevice(device.id)
    onClose()
    onDeleteCallback?.()
  }

  return (
    <Modal open title="Delete device?" onClose={onClose}>
      <p className="text-sm">
        You are about to delete the device <span className="font-medium">{device?.system_name}</span>. This action
        cannot be undone.
      </p>
      <div className="flex justify-end mt-8 gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
