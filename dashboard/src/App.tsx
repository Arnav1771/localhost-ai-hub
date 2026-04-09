import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

interface ApiStatus {
  gateway: string
  environment: string
  timestamp: string
}

function App() {
  const [status, setStatus] = useState<ApiStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/status')
        setStatus(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to connect to gateway')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <h1>localhost-ai-hub</h1>
      <div className="card">
        <h2>Gateway Status</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {status && (
          <div className="status">
            <p><strong>Gateway:</strong> {status.gateway}</p>
            <p><strong>Environment:</strong> {status.environment}</p>
            <p><strong>Last Updated:</strong> {new Date(status.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>
      <footer>
        <p>✅ Dashboard Connected to API Gateway</p>
        <a href="https://github.com/Arnav1771/localhost-ai-hub" target="_blank">
          View on GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
