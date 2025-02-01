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
      <p>You are about to delete the device {device?.system_name}. This action cannot be undone.</p>
      <div className="flex justify-end mt-2 gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
