import { Layout } from './components/Layout/Layout'
import NinjaOneLogo from './assets/NinjaOneLogo.svg'
import AppleIcon from './assets/apple.svg?react'
import WindowsIcon from './assets/windows.svg?react'
import LinuxIcon from './assets/linux.svg?react'
import Plus from './assets/plus.svg?react'
import SearchIcon from './assets/search.svg?react'
import Refresh from './assets/refresh.svg?react'
import { Button } from './components/Button/Button'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { getDevices } from './data/get-devices'
import { EditDeviceModal } from './containers/EditDeviceModal'
import { CreateDeviceModal } from './containers/CreateDeviceModal'
import { DeleteDeviceModal } from './containers/DeleteDeviceModal'
import { Device, DeviceType } from './types'
import { Input } from './components/Input/Input'
import { Select } from './components/Select/Select'

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
const DEVICE_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Windows', value: 'WINDOWS' },
  { label: 'Linux', value: 'LINUX' },
  { label: 'Mac', value: 'MAC' },
]
const SORT_OPTIONS = [
  { label: 'HDD Capacity (Descending)', value: 'hdd_desc' },
  { label: 'HDD Capacity (Ascending)', value: 'hdd_asc' },
  { label: 'Name (Descending)', value: 'name_desc' },
  { label: 'Name (Ascending)', value: 'name_asc' },
]

function App() {
  const [devices, setDevices] = useState<Device[]>([])
  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<Device>()
  const [deviceToEdit, setDeviceToEdit] = useState<Device>()
  const [filters, setFilters] = useState({
    deviceType: 'ALL',
    sortBy: 'hdd_desc',
    search: '',
  })

  const filteredDevices = useMemo(() => {
    let result: Device[] = devices
    const { search, deviceType, sortBy } = filters

    if (search) {
      result = result.filter((device) => device.system_name.toUpperCase().includes(search.toUpperCase()))
    }

    if (deviceType !== 'ALL') {
      result = result.filter((device) => device.type === deviceType)
    }

    // sort
    result.sort((a, b) => {
      if (sortBy === 'hdd_desc') {
        return Number(b.hdd_capacity) - Number(a.hdd_capacity)
      }

      if (sortBy === 'hdd_asc') {
        return Number(a.hdd_capacity) - Number(b.hdd_capacity)
      }

      if (sortBy === 'name_desc') {
        return b.system_name.localeCompare(a.system_name)
      }

      if (sortBy === 'name_asc') {
        return a.system_name.localeCompare(b.system_name)
      }
    })

    return result
  }, [filters, devices])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFilters({ ...filters, [name]: value })
  }

  const fetchDevices = async () => {
    const data = await getDevices()
    setDevices(data)
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  const onEditCallback = async () => {
    setDeviceToEdit(undefined)
    fetchDevices()
  }

  return (
    <>
      <header style={{ background: '#002a42' }}>
        <Layout>
          <div className="flex items-center" style={{ height: 50 }}>
            <img src={NinjaOneLogo} className="logo" alt="Ninja One" width="120" />
          </div>
        </Layout>
      </header>
      <Layout>
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-medium">Devices</h1>
          <Button variant="primary" icon={<Plus />} onClick={() => setNewDeviceModalOpen(true)}>
            Add Device
          </Button>
        </div>

        <div className="flex justify-between items-center mb-5">
          <div style={{ display: 'flex', gap: 8 }}>
            <Input icon={<SearchIcon />} name="search" placeholder="Search" onChange={handleFilterChange} />
            <Select name="deviceType" options={DEVICE_OPTIONS} onChange={handleFilterChange} />
            <Select name="sortBy" options={SORT_OPTIONS} onChange={handleFilterChange} />
          </div>
          <Button type="submit" icon={<Refresh />} variant="flat" />
        </div>

        <div>
          {filteredDevices.length === 0 && <p>No devices found.</p>}
          {filteredDevices.map((device: Device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border-b-gray-200 border-b-1">
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

      <DeleteDeviceModal
        device={deviceToDelete}
        onClose={() => setDeviceToDelete(undefined)}
        onDeleteCallback={fetchDevices}
      />
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
