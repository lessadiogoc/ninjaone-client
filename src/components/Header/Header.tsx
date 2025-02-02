import NinjaOneLogo from '../../assets/NinjaOneLogo.svg?react'

export const Header = () => {
  return (
    <header style={{ background: '#002a42' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center" style={{ height: 50 }}>
          <NinjaOneLogo />
        </div>
      </div>
    </header>
  )
}
