import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'
import { ReactElement, useEffect, useState } from 'react'
import { Device } from '../types'
import { createDevice } from '../data/create-device'

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
    <Modal open={open} title="Add Device" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="system_name"
            placeholder="system name"
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
          <input
            type="text"
            name="hdd_capacity"
            placeholder="hdd capacity"
            onChange={handleInputChange}
            value={newDevice.hdd_capacity}
            required
          />
        </div>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Device
        </Button>
      </form>
    </Modal>
  )
}
