// fetch devices from localhost:3000/devices

export const getDevices = async () => {
  const response = await fetch('http://localhost:3000/devices')
  const devices = await response.json()
  return devices
}
