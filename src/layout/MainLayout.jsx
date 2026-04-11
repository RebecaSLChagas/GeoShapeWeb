import { Outlet } from 'react-router'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function MainLayout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="page-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
