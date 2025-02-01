import { Device } from '../types'

export const updateDevice = async (device: Device) => {
  const response = await fetch('http://localhost:3000/devices/' + device.id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'put',
    body: JSON.stringify(device),
  })
  const updated = await response.json()
  return updated
}
