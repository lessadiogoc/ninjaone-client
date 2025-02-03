import Plus from './assets/plus.svg?react'
import SearchIcon from './assets/search.svg?react'
import Refresh from './assets/refresh.svg?react'
import { Button } from './components/Button/Button'
import { useEffect, useMemo, useState } from 'react'
import { getDevices } from './data/get-devices'
import { EditDeviceModal } from './containers/EditDeviceModal/EditDeviceModal'
import { CreateDeviceModal } from './containers/CreateDeviceModal/CreateDeviceModal'
import { DeleteDeviceModal } from './containers/DeleteDeviceModal/DeleteDeviceModal'
import { Device } from './types'
import { Input } from './components/Input/Input'
import { Select } from './components/Select/Select'
import { Header } from './components/Header/Header'
import { DevicesTable } from './containers/DevicesTable/DevicesTable'

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

    result.sort((a: Device, b: Device) => {
      if (sortBy === 'hdd_asc') {
        return Number(a.hdd_capacity) - Number(b.hdd_capacity)
      }

      if (sortBy === 'name_desc') {
        return b.system_name.localeCompare(a.system_name)
      }

      if (sortBy === 'name_asc') {
        return a.system_name.localeCompare(b.system_name)
      }

      // HDD Descending by default
      return Number(b.hdd_capacity) - Number(a.hdd_capacity)
    })

    return result
  }, [filters, devices])

  const onFilterChange = (field: keyof typeof filters) => (value: string) => {
    setFilters({ ...filters, [field]: value })
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
      <Header />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-medium">Devices</h1>
          <Button variant="primary" icon={<Plus />} onClick={() => setNewDeviceModalOpen(true)}>
            Add Device
          </Button>
        </div>

        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-2">
            <Input icon={<SearchIcon />} name="search" placeholder="Search" onChange={onFilterChange('search')} />
            <Select
              name="deviceType"
              options={DEVICE_OPTIONS}
              onChange={onFilterChange('deviceType')}
              prefix="Device Type:"
              value={filters.deviceType}
            />
            <Select
              name="sortBy"
              options={SORT_OPTIONS}
              onChange={onFilterChange('sortBy')}
              prefix="Sort by:"
              value={filters.sortBy}
            />
          </div>
          <Button type="button" icon={<Refresh />} variant="flat" onClick={fetchDevices} />
        </div>

        <DevicesTable devices={filteredDevices} onEditClick={setDeviceToEdit} onDeleteClick={setDeviceToDelete} />
      </div>

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
