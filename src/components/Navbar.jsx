import { NavLink } from 'react-router'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/formas', label: 'Formas' },
  { to: '/comparar', label: 'Comparar' },
]

function Navbar() {
  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="brand">
          <span className="brand-mark">GeoShape Web</span>
          <span className="brand-copy">Explorador visual de geometria plana</span>
        </NavLink>

        <nav className="site-nav" aria-label="Principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
