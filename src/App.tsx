import { Layout } from './components/Layout/Layout'
import NinjaOneLogo from './assets/NinjaOneLogo.svg'
import appleIcon from './assets/apple.svg'
import windowsIcon from './assets/windows.svg'
import linuxIcon from './assets/linux.svg'
import { Modal } from './components/Modal/Modal'

type DEVICE = 'windows' | 'linux' | 'mac'

const devices = [
  {
    id: 1,
    name: 'DESKTOP-0VCBIFF',
    type: 'windows',
    hdd_capacity: 128,
  },
  {
    id: 2,
    name: 'LINUX-SMITH-J',
    type: 'linux',
    hdd_capacity: 64,
  },
  {
    id: 3,
    name: 'WINXP-125498HQ',
    type: 'windows',
    hdd_capacity: 64,
  },
  {
    id: 4,
    name: 'MAC-SMITH-JOHN',
    type: 'mac',
    hdd_capacity: 64,
  },
]

const DEVICE_LABELS = {
  windows: 'Windows workstation',
  linux: 'Linux workstation',
  mac: 'Mac workstation',
}
const DEVICE_ICONS = {
  windows: windowsIcon,
  linux: linuxIcon,
  mac: appleIcon,
}

function App() {
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
          <button>Add Device</button>
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
              <option value="HDD_DESC">HDD Capacity (Descending)</option>
              <option value="HDD_ASC">HDD Capacity (Ascending)</option>
            </select>
          </div>
          <button type="submit">Filter</button>
        </form>

        {/* table */}
        <div>
          {devices.map((device) => (
            <div
              style={{
                padding: 16,
                borderBottom: '1px solid #E7E8EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <img src={DEVICE_ICONS[device.type as DEVICE]} />
                  {device.name}
                </h3>
                <p>
                  {DEVICE_LABELS[device.type as DEVICE]} - {device.hdd_capacity} GB
                </p>
              </div>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
      {/* <Modal open={true} title="Add Device" onClose={() => console.log('closing...')}>
        <p>Lorem ipsum dolor</p>
      </Modal> */}
    </>
  )
}

export default App
