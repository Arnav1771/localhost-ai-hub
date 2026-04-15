import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
  name: string;
  status: string;
  cpuUsage?: string;
  memoryUsage?: string;
  uptime?: string;
}

const Dashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch service statuses. Gateway may not be running.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderServiceStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'running': 'status-active',
      'stopped': 'status-inactive',
      'error': 'status-inactive',
    };
    const className = statusMap[status] || 'status-inactive';
    return <span className={className}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Monitor the status and metrics of all services in the system</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="card">
          <p>Loading service statuses...</p>
        </div>
      ) : (
        <div>
          {services && services.length > 0 ? (
            <div className="card">
              <h3>Services Status</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Service Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>CPU Usage</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Memory Usage</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.name} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>{service.name}</td>
                      <td style={{ padding: '10px' }}>{renderServiceStatus(service.status)}</td>
                      <td style={{ padding: '10px' }}>{service.cpuUsage || 'N/A'}</td>
                      <td style={{ padding: '10px' }}>{service.memoryUsage || 'N/A'}</td>
                      <td style={{ padding: '10px' }}>{service.uptime || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card">
              <p>No services available. Make sure the API Gateway is running on port 3001.</p>
            </div>
          )}
        </div>
      )}

      <div className="card">
        <h3>Quick Start</h3>
        <ul>
          <li>Gateway API running on: http://localhost:3001</li>
          <li>Dashboard running on: http://localhost:3000</li>
          <li>Navigate to Agents to create AI agents</li>
          <li>Navigate to Workflows to create automation workflows</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;