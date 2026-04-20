import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import ServicesPage from './pages/ServicesPage'
import LayersPage from './pages/LayersPage'
import SetupPage from './pages/SetupPage'
import SettingsPage from './pages/SettingsPage'
import { useSettingsStore } from './store/settings'
import { SERVICES } from './data/services'

type PageType = 'dashboard' | 'services' | 'layers' | 'setup' | 'settings'

interface NavItem {
  id: PageType
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⚡' },
  { id: 'services',  label: 'Services',  icon: '📦' },
  { id: 'layers',    label: 'Layers',    icon: '🏗️' },
  { id: 'setup',     label: 'Setup',     icon: '🛠️' },
  { id: 'settings',  label: 'Settings',  icon: '⚙️' },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { serviceStatuses } = useSettingsStore()

  const onlineCount = Object.values(serviceStatuses).filter((s) => s.status === 'up').length
  const totalCount = SERVICES.length

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />
      case 'services':  return <ServicesPage />
      case 'layers':    return <LayersPage />
      case 'setup':     return <SetupPage />
      case 'settings':  return <SettingsPage />
      default:          return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-60 bg-zinc-900 border-r border-zinc-800
          flex flex-col transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="text-sm font-bold text-zinc-100 leading-none">Local AI Hub</h1>
              <p className="text-[10px] text-zinc-500 mt-0.5">AI Operating System</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setSidebarOpen(false) }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${currentPage === item.id
                  ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer status */}
        <div className="px-4 py-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${onlineCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
            <span className="text-zinc-500">
              {onlineCount}/{totalCount} services online
            </span>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-4 shrink-0">
          <button
            className="lg:hidden text-zinc-400 hover:text-zinc-200 p-1 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-zinc-200">
              {NAV_ITEMS.find((n) => n.id === currentPage)?.icon}{' '}
              {NAV_ITEMS.find((n) => n.id === currentPage)?.label}
            </h2>
          </div>
          <a
            href="https://github.com/Arnav1771/localhost-ai-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
          >
            GitHub ↗
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

