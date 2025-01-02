import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function StaffDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/staff/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        if (data.success) {
          setDashboardData(data.data);
        } else {
          throw new Error(data.message || 'Failed to load dashboard data');
        }
      } catch (error) {
        console.error('Dashboard error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Staff Dashboard
          </h1>
          {dashboardData && (
            <div className="mt-4">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium">Staff Details</h2>
                <div className="mt-4 space-y-2">
                  <p><span className="font-medium">Name:</span> {dashboardData.name}</p>
                  <p><span className="font-medium">Email:</span> {dashboardData.email}</p>
                  <p><span className="font-medium">Staff ID:</span> {dashboardData.staffId}</p>
                  <p><span className="font-medium">Role:</span> {dashboardData.role}</p>
                </div>
              </div>

              {dashboardData.properties && (
                <div className="mt-6 bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium">Properties</h2>
                  <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {dashboardData.properties.map(property => (
                      <div key={property.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-gray-600">{property.location}</p>
                        <p className="text-gray-600">Status: {property.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}