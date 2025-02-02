import { ReactElement } from 'react'

import AppleIcon from '../../assets/apple.svg?react'
import WindowsIcon from '../../assets/windows.svg?react'
import LinuxIcon from '../../assets/linux.svg?react'
import { Device, DeviceType } from '../../types'

import { Menu, MenuItem } from '../../components/Menu/Menu'

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

interface Props {
  devices: Device[]
  onEditClick: (device: Device) => void
  onDeleteClick: (device: Device) => void
}

export const DevicesTable = ({ devices, onEditClick, onDeleteClick }: Props) => {
  if (devices.length === 0) {
    return <p>No devices found.</p>
  }

  return (
    <div>
      <h3 className="border-b-1 border-b-gray-300 pl-4 pb-2 text-sm font-medium">Device</h3>
      {devices.map((device: Device) => (
        <div
          key={device.id}
          data-cy={`device-row-${device.id}`}
          className="flex items-center justify-between p-4 border-b-gray-200 border-b-1 hover:bg-gray-100"
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

          <Menu>
            <MenuItem onClick={() => onEditClick({ ...device })}>Edit</MenuItem>
            <MenuItem onClick={() => onDeleteClick({ ...device })} variant="danger">
              Delete
            </MenuItem>
          </Menu>
        </div>
      ))}
    </div>
  )
}
