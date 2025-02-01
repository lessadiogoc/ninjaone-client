import { useState } from 'react'
import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'
import { Device } from '../types'
import { createDevice } from '../data/create-device'
import { Input } from '../components/Input/Input'

interface Props {
  onCreateCallback?: () => void
  onClose: () => void
  open: boolean
}

const DEFAULT_VALUE: Omit<Device, 'id'> = {
  system_name: '',
  type: 'WINDOWS',
  hdd_capacity: '',
}

export const CreateDeviceModal = ({ open, onClose, onCreateCallback }: Props) => {
  const [newDevice, setNewDevice] = useState<Omit<Device, 'id'>>({ ...DEFAULT_VALUE })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await createDevice(newDevice)
    onClose()
    setNewDevice({ ...DEFAULT_VALUE })
    onCreateCallback?.()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setNewDevice({ ...newDevice, [name]: value })
  }

  return (
    <Modal open={open} title="Add device" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="System name"
            type="text"
            name="system_name"
            onChange={handleInputChange}
            value={newDevice.system_name}
            required
          />
        </div>
        <div>
          <select name="type" required value={newDevice.type} onChange={handleInputChange}>
            <option value="WINDOWS">Windows</option>
            <option value="LINUX">Linux</option>
            <option value="MAC">Mac</option>
          </select>
        </div>
        <div>
          <Input
            label="HDD capacity (GB)"
            type="number"
            name="hdd_capacity"
            onChange={handleInputChange}
            value={newDevice.hdd_capacity}
            required
          />
        </div>
        <div className="flex justify-end mt-2 gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Device
          </Button>
        </div>
      </form>
    </Modal>
  )
}
