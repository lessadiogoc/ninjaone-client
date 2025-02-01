import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'
import { ReactElement, useEffect, useState } from 'react'
import { Device } from '../types'
import { updateDevice } from '../data/update-device'

interface Props {
  device?: Device
  onEditCallback?: () => void
}

export const EditDeviceModal = ({ device, onEditCallback }: Props) => {
  const [newDevice, setNewDevice] = useState<Device>()

  useEffect(() => {
    if (device) {
      setNewDevice({ ...device })
    }
  }, [device])

  if (!newDevice) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateDevice(newDevice)
    setNewDevice(undefined)
    onEditCallback?.()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setNewDevice({ ...newDevice, [name]: value })
  }

  return (
    <Modal open title="Edit device" onClose={() => setNewDevice(undefined)}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="system_name"
            placeholder="system name"
            onChange={handleInputChange}
            required
            value={newDevice.system_name}
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
        <Button variant="secondary" onClick={() => setNewDevice(undefined)}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Device
        </Button>
      </form>
    </Modal>
  )
}
