// fetch devices from localhost:3000/devices

type Body = {
  system_name: string
  type: 'WINDOWS' | 'LINUX' | 'MAC'
  hdd_capacity: string
}

export const updateDevice = async (id: string, body: Body) => {
  const response = await fetch('http://localhost:3000/devices/' + id, { method: 'put', body: JSON.stringify(body) })
  const updated = await response.json()
  return updated
}
