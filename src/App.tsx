import { Layout } from './components/Layout/Layout'
import NinjaOneLogo from './assets/NinjaOneLogo.svg'
import AppleIcon from './assets/apple.svg?react'
import WindowsIcon from './assets/windows.svg?react'
import LinuxIcon from './assets/linux.svg?react'
import Plus from './assets/plus.svg?react'
import Refresh from './assets/refresh.svg?react'
import { Modal } from './components/Modal/Modal'
import { Button } from './components/Button/Button'
import { ReactElement, useEffect, useState } from 'react'
import { getDevices } from './data/get-devices'
import { createDevice } from './data/create-device'
import { deleteDevice } from './data/delete-device'
import { Device, DeviceType } from './types'
import { EditDeviceModal } from './containers/EditDeviceModal'
import { CreateDeviceModal } from './containers/CreateDeviceModal'

const DEVICE_LABELS: Record<DeviceType, string> = {
  WINDOWS: 'Windows workstation',
  LINUX: 'Linux workstation',
  MAC: 'Mac workstation',
}
const DEVICE_ICONS: Record<DeviceType, ReactElement> = {
  WINDOWS: <WindowsIcon />,
  LINUX: <LinuxIcon />,
  MAC: <AppleIcon />,
}

function App() {
  const [devices, setDevices] = useState([])
  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<Device>()
  const [deviceToEdit, setDeviceToEdit] = useState<Device>()

  const fetchDevices = () => {
    getDevices().then((data) => setDevices(data))
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  const handleDeviceDelete = async () => {
    if (!deviceToDelete) return

    const deleted = await deleteDevice(deviceToDelete.id)
    if (deleted) {
      setDeviceToDelete(undefined)
      fetchDevices()
    } else {
      // Modify error notification
      alert('Failed to delete device')
    }
  }

  const onEditCallback = async () => {
    setDeviceToEdit(undefined)
    fetchDevices()
  }

  return (
    <>
      <header style={{ background: '#002a42' }}>
        <Layout>
          <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <img src={NinjaOneLogo} className="logo" alt="Ninja One" width="120" />
          </div>
        </Layout>
      </header>
      <Layout>
        {/* title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Devices</h1>
          <Button variant="primary" icon={<Plus />} onClick={() => setNewDeviceModalOpen(true)}>
            Add Device
          </Button>
        </div>

        {/* filter */}
        <form
          onSubmit={(e) => console.log('submitting...')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="text" name="search" placeholder="Search" />
            <select name="deviceType">
              <option value="all">All</option>
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="mac">Mac</option>
            </select>
            <select name="sortBy">
              <option value="hdd_desc">HDD Capacity (Descending)</option>
              <option value="hdd_asc">HDD Capacity (Ascending)</option>
              <option value="name_desc">Name (Descending)</option>
              <option value="name_asc">Name (Ascending)</option>
            </select>
          </div>
          <Button type="submit" icon={<Refresh />} variant="flat" />
        </form>

        {/* table */}
        <div>
          {devices.map((device: Device) => (
            <div
              key={device.id}
              style={{
                padding: 16,
                borderBottom: '1px solid #E7E8EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div className="flex items-center gap-1 text-md text-gray-800">
                  {DEVICE_ICONS[device.type]}
                  <h3>{device.system_name}</h3>
                </div>
                <p className="text-gray-500 text-sm">
                  {DEVICE_LABELS[device.type]} - {device.hdd_capacity} GB
                </p>
              </div>
              <div>
                <button onClick={() => setDeviceToEdit({ ...device })}>Edit</button>
                <button onClick={() => setDeviceToDelete({ ...device })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Layout>

      <Modal open={Boolean(deviceToDelete)} title="Delete device?" onClose={() => setDeviceToDelete(undefined)}>
        <p>You are about to delete the device {deviceToDelete?.system_name}. This action cannot be undone.</p>
        <Button variant="secondary" onClick={() => setDeviceToDelete(undefined)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeviceDelete}>
          Delete
        </Button>
      </Modal>
      <CreateDeviceModal
        open={newDeviceModalOpen}
        onClose={() => setNewDeviceModalOpen(false)}
        onCreateCallback={fetchDevices}
      />
      <EditDeviceModal device={deviceToEdit} onEditCallback={onEditCallback} />
    </>
  )
}

export default App
