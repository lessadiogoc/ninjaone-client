import { useEffect, useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { Device } from '../../types'
import { updateDevice } from '../../data/update-device'
import { Input } from '../../components/Input/Input'
import { Select } from '../../components/Select/Select'

interface Props {
  device?: Device
  onEditCallback?: () => void
}

const DEVICE_OPTIONS = [
  { label: 'Windows', value: 'WINDOWS' },
  { label: 'Linux', value: 'LINUX' },
  { label: 'Mac', value: 'MAC' },
]

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

  const onFieldChange = (field: keyof Device) => (value: string) => {
    setNewDevice({ ...newDevice, [field]: value })
  }

  return (
    <Modal open title="Edit device" onClose={() => setNewDevice(undefined)}>
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
              required
              value={newDevice.type}
              onChange={onFieldChange('type')}
              options={DEVICE_OPTIONS}
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
          <Button type="button" variant="secondary" onClick={() => setNewDevice(undefined)}>
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
