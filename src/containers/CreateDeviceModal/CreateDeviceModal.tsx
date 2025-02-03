import { useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { Device } from '../../types'
import { createDevice } from '../../data/create-device'
import { Input } from '../../components/Input/Input'
import { Select } from '../../components/Select/Select'

interface Props {
  onCreateCallback?: () => void
  onClose: () => void
  open: boolean
}

const DEVICE_OPTIONS = [
  { label: 'Windows', value: 'WINDOWS' },
  { label: 'Linux', value: 'LINUX' },
  { label: 'Mac', value: 'MAC' },
]

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

  const onFieldChange = (field: keyof Device) => (value: string) => {
    setNewDevice({ ...newDevice, [field]: value })
  }

  return (
    <Modal open={open} title="Add device" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col">
          <div>
            <Input
              label="System name *"
              name="system_name"
              onChange={onFieldChange('system_name')}
              value={newDevice.system_name}
              required
            />
          </div>
          <div>
            <Select
              label="Device type *"
              name="type"
              value={newDevice.type}
              onChange={onFieldChange('type')}
              options={DEVICE_OPTIONS}
              required
            />
          </div>
          <div>
            <Input
              label="HDD capacity (GB) *"
              type="number"
              name="hdd_capacity"
              onChange={onFieldChange('hdd_capacity')}
              value={newDevice.hdd_capacity}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
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
