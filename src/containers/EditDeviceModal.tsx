import { useEffect, useState } from 'react'
import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'
import { Device } from '../types'
import { updateDevice } from '../data/update-device'
import { Input } from '../components/Input/Input'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setNewDevice({ ...newDevice, [name]: value })
  }

  return (
    <Modal open title="Edit device" onClose={() => setNewDevice(undefined)}>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="System name"
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
          <Button variant="secondary" onClick={() => setNewDevice(undefined)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  )
}
