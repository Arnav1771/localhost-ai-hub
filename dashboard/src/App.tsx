import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import Workflows from './pages/Workflows'
import './App.css'

type PageType = 'dashboard' | 'agents' | 'workflows'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'agents':
        return <Agents />
      case 'workflows':
        return <Workflows />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="logo">
          <h1>🤖 Local AI Hub</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <button
              className={currentPage === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'agents' ? 'active' : ''}
              onClick={() => setCurrentPage('agents')}
            >
              Agents
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'workflows' ? 'active' : ''}
              onClick={() => setCurrentPage('workflows')}
            >
              Workflows
            </button>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}
