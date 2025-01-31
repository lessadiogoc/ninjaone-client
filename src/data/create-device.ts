// fetch devices from localhost:3000/devices

type Body = {
  system_name: string
  type: 'WINDOWS' | 'LINUX' | 'MAC'
  hdd_capacity: string
}

export const createDevice = async (body: Body) => {
  const response = await fetch('http://localhost:3000/devices/', { method: 'post', body: JSON.stringify(body) })
  const device = await response.json()
  return device
}
