import NinjaOneLogo from '../../assets/NinjaOneLogo.svg'

import './header.css'

export const Header = () => {
  return (
    <header className="header">
      <img src={NinjaOneLogo} className="logo" alt="Ninja One" width="120" />
    </header>
  )
}
