import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch service statuses and metrics from the API gateway
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services/status');
        setServices(response.data.services);
      } catch (err) {
        setError('Failed to fetch service statuses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const renderServiceStatus = (status: string) => {
    switch (status) {
      case 'running':
        return <span className="status running">Running</span>;
      case 'stopped':
        return <span className="status stopped">Stopped</span>;
      case 'error':
        return <span className="status error">Error</span>;
      default:
        return <span className="status unknown">Unknown</span>;
    }
  };

  return (
    <div className="dashboard">
      <h1>LocalHost AI Agent Hub: Ultimate All-In-One AI Operating System</h1>
      <p>Monitor the status and metrics of all services in the system.</p>

      {isLoading && <p>Loading service statuses...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <div className="services-container">
          {services.length > 0 ? (
            <table className="services-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Status</th>
                  <th>CPU Usage</th>
                  <th>Memory Usage</th>
                  <th>Uptime</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.name}>
                    <td>{service.name}</td>
                    <td>{renderServiceStatus(service.status)}</td>
                    <td>{service.cpuUsage}</td>
                    <td>{service.memoryUsage}</td>
                    <td>{service.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No services available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;