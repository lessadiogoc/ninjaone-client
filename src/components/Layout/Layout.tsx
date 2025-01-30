import './layout.css'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return <div className="layout">{children}</div>
}
