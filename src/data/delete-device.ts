// fetch devices from localhost:3000/devices

export const deleteDevice = async (id: string) => {
  const response = await fetch('http://localhost:3000/devices/' + id, { method: 'delete' })
  const device = await response.json()
  return device
}
