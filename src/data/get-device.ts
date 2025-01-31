// fetch devices from localhost:3000/devices

export const getDevice = async (id: string) => {
  const response = await fetch('http://localhost:3000/devices/' + id)
  const device = await response.json()
  return device
}
